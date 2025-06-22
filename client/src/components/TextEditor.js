
import "./TextEditor.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
// import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from 'react';
import { socket } from './socket';

const TOOLBAR_OPTIONS = [
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'super' }, { 'script': 'sub' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean'],
     [{ 'header': 'code-block' }, 'code-language'],
];
const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    // Add more languages as needed
];
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
  ];
const Modules = {
    toolbar:  {
        container: TOOLBAR_OPTIONS,
        handlers: {
            'code-block': function() {
                const range = this.quill.getSelection();
                if (range) {
                    const language = 'javascript'; // Use the selected language
                    this.quill.insertEmbed(range.index, 'code-block', { language });
                    // this.quill.insertEmbed(0, 'code-container', '<div className = "code-container"><div/>');
                    this.quill.setSelection(range.index + 1);
                }
                // console.log(this.quill)

                // console.log(this.quill.addContainer.length)
            },
            // Define a custom handler for code-language if needed
        }
    },
    syntax: {
        highlight: function (text) {
          return hljs.highlightAuto(text).value;
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
};

hljs.configure({
    // optionally configure hljs
    languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
  });

export default function TextEditor({ id, text }) {
    const [quillText, setQuillText] = useState(text);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    useEffect(() => {
        // Set the initial text from the parent component
        setQuillText(text);
    }, [text]); // Ensure this only runs when the `text` prop changes

    useEffect(() => {
        // Handle WebSocket connection
        socket.on('connect', () => {
            setIsConnected(true);
            console.log("Connected to server");
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log("Disconnected from server");
        });

        socket.on("welcome", (message) => {
            console.log(message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Join the room based on document ID
        socket.emit("join-room", id);  // `id` is the document ID
    
        // Existing connection and event handling code
    }, [id]);
    
    useEffect(() => {
        socket.on("recieve-modified", (input) => {
            if (input && input !== quillText) {
                setQuillText(input);
            }
        });

        return () => {
            socket.off("recieve-modified");
        };
    }, [quillText]);

    const ChangeHandler = (html, delta, source, editor) => {
        setQuillText(html);
        socket.emit("sending-changes", { id, html });
    };

    return (
        <div className="w-full min-h-screen overflow-scroll">
            
            <ReactQuill
                theme="snow"
                value={quillText}
                modules={Modules}
                formats={formats}
                id='doc-container'
                className="relative z-0"
                onChange={ChangeHandler}
                preserveWhitespace
            />
            
        </div>
    );
}
