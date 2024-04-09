import React,{useState,useRef,useEffect} from 'react'
import fileDropZoneStyles from './fileDropZone.module.css'
import filesListStyles from './filesList.module.css'

export const FileDropZone = ({multiple , acceptTypes , maxFiles,minFiles,maxFilesSizeInBytes ,onChange }) => {
  const [isHovered,setIsHovered ] = useState(false)
  const [errorMessages ,setErrorMessages  ] = useState([])
  const [files,setFiles] = useState([])
  const fileInputRef = useRef()

  const checkingСonditions = (eventFiles) =>{
    const filesArray = Array.from(eventFiles);
    const filesSizeInBytes = filesArray.reduce(function (a, b) {
      return Number(a.size) + Number(b.size);
    });

    if (minFiles !== undefined && filesArray.length < minFiles) {
      setErrorMessages(prevMessages => [...prevMessages, "Minimum number of files " + minFiles]);
    }
    if (maxFiles !== undefined && filesArray.length > maxFiles) {
      setErrorMessages(prevMessages => [...prevMessages, "Maximum number of files " + maxFiles]);
    }
    if (maxFilesSizeInBytes !== undefined && filesSizeInBytes > maxFilesSizeInBytes) {
      setErrorMessages(prevMessages => [
        ...prevMessages,
        "The total number of files should not exceed " + (maxFilesSizeInBytes / (1024 * 1024)).toFixed(2) + "mb"
      ]);
    }
    if (errorMessages.length === 0) {
      setFiles(filesArray)
    }
  };

  useEffect(()=>{
    onChange(files)
  },[files])

  const handleDrop = (event)=> {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setIsHovered(false);
    checkingСonditions(files);
  };

  return <div
    className={fileDropZoneStyles["file-drop-zone_box"]}
    onDragEnter={(event)=> {
      event.preventDefault();
      setIsHovered(true);
    }}
    onDragOver={(event)=>{
      event.preventDefault();
      setIsHovered(true);
    }}
    onDragLeave={(event)=>{
      setIsHovered(false)
    }}
    onDrop={handleDrop}
    style={{border: isHovered ? '1px dashed #0072d2' : '1px dashed #a8a8a8'}}
  >
    <input type={'file'} ref={fileInputRef} multiple={multiple} style={{display:'none'}} accept={acceptTypes} onChange={(event)=>checkingСonditions(event.target.files)}/>

    {errorMessages.length !== 0 ? <div className={fileDropZoneStyles['file-drop-zone_errors']}>
      {errorMessages.map((errorMsg) => <span key={errorMsg}>{errorMsg}</span>)}
      <button className={fileDropZoneStyles['file-drop-zone_button']} onClick={() => {
        setFiles([])
        setErrorMessages([])
      }}>Close
      </button>
    </div> : files.length !== 0
      ? <FilesList files={files} setFiles={setFiles}/>
      : <div className={fileDropZoneStyles['file-drop-zone__upload-box']}>
          <button className={fileDropZoneStyles['file-drop-zone_button']} onClick={() => fileInputRef.current.click()}>Select file</button>
          <span>or drag and drop files</span>
        </div>
    }
  </div>
}

export const FilesList = (files) => {
  return <div className={filesListStyles['files-list']}>
    {Array.from(files.files).map((file,index) => <div key={file + "" + index} className={filesListStyles['file-box']}>
      <span className={filesListStyles["file-box__file-name"]}>{file.name}</span>
        <button className={filesListStyles["file-box__file-button"]} onClick={()=>files.setFiles(files.files.filter((el,indexFilter)=> index !== indexFilter))}>remove</button>
    </div>)}
  </div>
}
