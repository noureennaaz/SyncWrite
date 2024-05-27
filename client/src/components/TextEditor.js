
import "./TextEditor.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';
import { socket } from './socket';


const TOOLBAR_OPTIONS =  [
    [{ 'font': [] }, { 'size': [] }],
    [ 'bold', 'italic', 'underline', 'strike' ],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'super' }, { 'script': 'sub' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
    [ 'link'],
    [ 'clean' ]
]
const Modules={
    toolbar:TOOLBAR_OPTIONS
}

export default function TextEditor() {
    
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [quillText , setQuillText]=useState(null)
    var changes = "";
    const [htmlText, setHtml]=useState("")
    
    useEffect( () => {
        // function onConnect() {
        //     setIsConnected(true);
        // }

        socket.on('connect', (message)=>{
            // onConnect();
            console.log(message);
        });
        
        socket.on("welcome", (message)=>{
            // console.log('user detected')
            // setIsConnected(false)
            console.log(message)
        })

        return ()=>{
            socket.disconnect();
        }
    }, [])
 

    useEffect( () => {
        
        console.log('I recieved changes')
        
        socket.on("recieve-modified",(input)=>{
            if( (input != changes) || ( changes !== ""))  
            {
                console.log("THE input is", input) 
                setQuillText(input)
            }
            else{
                console.log('working')
            }
            
        })

     return ()=>{
        socket.off("recieve-modified", ()=>{console.log('CLOSED THE BROADCASTION OF TEXT TO OTHER CLIENTS')});
    }
        
    }, [socket])
    
   

    const ChangeHandler= ( html, delta, source, editor) => {
        
        changes=html
        socket.emit("sending-changes", html) 
           
    }
   
    return(
        <div className="w-full mih-h-screen overflow-scroll">
           
            <ReactQuill theme="snow" value={quillText} modules={Modules} className="relative" onChange={ChangeHandler} preserveWhitespace/> 
        </div>
        
    )
}