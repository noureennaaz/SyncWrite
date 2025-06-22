import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import ImageResize from "quill-image-resize";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const FileMenu = ({setCreate, fileName, toggleSaveAs, toggleSaveToast}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState("");

  const handleToggle = () =>{
    setIsOpen(!isOpen);
  } 
  const handleDownload = () => {
    const editorContainer = document.querySelector(".ql-editor"); // Target the editor's content

    html2canvas(editorContainer, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size PDF (210 x 297 mm)
      const imgWidth = 190; // Content width with 10 mm padding on each side
      const pageHeight = 297; // A4 page height
      const margin = 10; // Padding on all sides

      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height proportionally
      let position = margin;

      const totalPages = Math.ceil(imgHeight / (pageHeight - 2 * margin)); // Calculate total pages required

      for (let i = 0; i < totalPages; i++) {
        const sourceY = i * (pageHeight - 2 * margin) * (canvas.height / imgHeight);
        const sourceHeight = Math.min(
          canvas.height - sourceY,
          (pageHeight - 2 * margin) * (canvas.height / imgHeight)
        );

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;

        const ctx = pageCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        const pageImgData = pageCanvas.toDataURL("image/png");

        if (i > 0) pdf.addPage(); // Add a new page after the first
        pdf.addImage(
          pageImgData,
          "PNG",
          margin,
          position,
          imgWidth,
          pageHeight - 2 * margin
        );
      }
      const title = `${fileName}.pdf`;
      console.log(pdf.save);
      pdf.save(title);
    });
  };
  
  const handleSave = ()=>{
    toggleSaveToast(true);
    setTimeout(()=>{
      toggleSaveToast(false);
    }, 3000)
  }
  
  const handleAction = (action) => {
    alert(`You selected: ${action}`);
  };

  return (
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className=" z-[9999] fixed top-5 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center"
        style={{ left: isOpen ? "190px" : "20px" }}
      >
        {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>

      {/* Collapsible Menu */}
      <div
        className={`z-50 fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col items-start p-4">
          <h3 className="text-xl font-semibold mb-4">Options</h3>

          <button
            onClick={() => setCreate((value)=>!value)}
            className="w-full text-left px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
          >
            New File
          </button>
          <button
            onClick={() => handleSave()}
            className="w-full text-left px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
          >
            Save
          </button>
          <button
            onClick={() => toggleSaveAs((val)=>!val)}
            className="w-full text-left px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
          >
            Save As
          </button>
          <button
            onClick={() => handleAction("Share")}
            className="w-full text-left px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
          >
            Share
          </button>
          <button
            onClick={handleDownload}
            className="w-full text-left px-4 py-2 mb-2 rounded-md hover:bg-gray-100"
          >
            Download
          </button>
          <button
            onClick={() => window.print()}
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Print
          </button>
          <button
            onClick={() => window.print()}
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileMenu;
