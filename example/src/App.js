import {FileDropZone} from 'react-file-uploadify'
import 'react-file-uploadify/dist/index.css'
import React,{useState} from "react";
import indexStyles from './index.module.css'
const App = () => {
  const [files,setFiles] = useState([])
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  return <div style={{width:"600px",height:"300px",margin:"92px"}}>
    <FileDropZone
      onChange={updateFiles}
      maxFilesSizeInMb={2}
      acceptTypes={[".docx",".pdf",".jpg"]}
      haveFileList={true}
      multiple={true}
      minFiles={2}
      maxFiles={5}
      lang={"en"}
      classNames={
      {"file-drop-zone_box":indexStyles.myFileDropZoneBoxClass,
        "file-drop-zone_button":indexStyles.myButtonClass,
        "file-icon":indexStyles.myFileIconClass,
        "file-box":indexStyles.myFileBoxClass,
        "file-box__file-button":indexStyles.myFileButton
      }
    }
    />
  </div>

}

export default App
