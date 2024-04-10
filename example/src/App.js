import {FileDropZone} from 'react-file-uploadify'
import 'react-file-uploadify/dist/index.css'
import React,{useState} from "react";

const App = () => {
  const [files,setFiles] = useState([])

  const updateFiles = (incommingFiles) => {
    console.log(incommingFiles)
    setFiles(incommingFiles);
  };
  return <div style={{width:"600px",height:"300px",margin:"92px"}}>
    <FileDropZone onChange={updateFiles}  acceptTypes={[".pdf",".docx"]}  multiple={true} minFiles={2}/>
  </div>

}

export default App
