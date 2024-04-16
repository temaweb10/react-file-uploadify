import {FileDropZone} from 'react-file-uploadify'
import 'react-file-uploadify/dist/index.css'
import React,{useState} from "react";
import myClassNames from './index.module.css'
const App = () => {
  const [files,setFiles] = useState([])
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  return <div style={{width:"600px",height:"300px",margin:"92px"}}>
    <FileDropZone
      onChange={updateFiles}
      acceptTypes={[".docx",".pdf",".jpg"]}
      haveFileList={true}
      multiple={true}
      minFiles={2}
      maxFiles={5}
      lang={"en"}
    />
  </div>

}

export default App
