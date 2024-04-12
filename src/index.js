import React, { useState, useRef, useEffect } from 'react';
import fileDropZoneStyles from './fileDropZone.module.css';
import filesListStyles from './filesList.module.css';
import { FaRegFileImage, FaRegFileVideo, FaRegFile, FaRegFilePowerpoint } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { langRu, langEn } from './lang';

export const FileDropZone = ({ multiple, acceptTypes, maxFiles, minFiles, maxFilesSizeInBytes, maxFilesSizeInMb, onChange, haveFileList, classNames, lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isNeedValidationFiles, setIsNeedValidationFiles] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();
  const langDefined = lang === undefined ? langEn : lang === "en" ? langEn : langRu;
  const isHaveFileList = haveFileList === undefined ? true : haveFileList;

  const filesValidation = (eventFiles) => {
    const eventFilesArray = Array.from(eventFiles);
    const filesSizeInBytes = eventFilesArray.reduce((accumulator, file) => accumulator + file.size, 0);
    const bytesInMegabyte = 1024 * 1024;
    const totalMegabytes = filesSizeInBytes / bytesInMegabyte;

    if (acceptTypes !== undefined) {
      for (let i = 0; i < eventFilesArray.length; i++) {
        const extension = eventFilesArray[i].name.substring(eventFilesArray[i].name.lastIndexOf('.')).toLowerCase();
        const isValidExtension = acceptTypes.includes(extension);

        if (!isValidExtension) {
          setErrorMessages(prevMessages => [...prevMessages, langDefined.invalidExtension]);
          break;
        }
      }
    }

    if (maxFilesSizeInMb !== undefined && maxFilesSizeInBytes === undefined) {
      if (totalMegabytes > maxFilesSizeInMb) {
        setErrorMessages(prevMessages => [
          ...prevMessages,
          `${langDefined.maxFilesSizeBytesError} ${maxFilesSizeInMb}mb`
        ]);
      }
    } else if (maxFilesSizeInMb === undefined && maxFilesSizeInBytes !== undefined) {
      if (filesSizeInBytes > maxFilesSizeInBytes) {
        setErrorMessages(prevMessages => [
          ...prevMessages,
          `${langDefined.maxFilesSizeMbError} ${maxFilesSizeInBytes} bytes`
        ]);
      }
    }

    setIsNeedValidationFiles(actualState => {
      if (actualState) {
        if (minFiles !== undefined && eventFilesArray.length < minFiles) {
          setErrorMessages(prevMessages => [...prevMessages, langDefined.minFilesError + minFiles]);
        }
        if (maxFiles !== undefined && eventFilesArray.length > maxFiles) {
          setErrorMessages(prevMessages => [...prevMessages, langDefined.maxFilesError + maxFiles]);
        }

        setErrorMessages(prevMessages => {
          if (prevMessages.length === 0) {
            setFiles(eventFilesArray);
          }
          return prevMessages;
        });
      } else {
        setErrorMessages(prevMessages => {
          if (prevMessages.length === 0) {
            setFiles([...files, ...eventFilesArray]);
          }
          return prevMessages;
        });
        return true;
      }
    });
  };

  useEffect(() => {
    onChange(files);
  }, [files]);

  useEffect(() => {
    if (files.length !== 0) {
      setIsNeedValidationFiles(false);
    } else if (files.length === 0) {
      setIsNeedValidationFiles(true);
    }
  }, [isNeedValidationFiles]);

  const handleDrop = (event) => {
    event.preventDefault();
    const eventFiles = event.dataTransfer.files;
    setIsHovered(false);
    if (files.length !== 0) {
      setIsNeedValidationFiles(false);
    }
    filesValidation(eventFiles);
  };

  const fileDropZoneClasses =  classNames && classNames["file-drop-zone_box"]  ? [fileDropZoneStyles["file-drop-zone_box"], classNames["file-drop-zone_box"]].join(" ") : fileDropZoneStyles["file-drop-zone_box"];
  console.log(fileDropZoneClasses)
  const buttonClasses = classNames && classNames['file-drop-zone_button'] ? [classNames['file-drop-zone_button'], fileDropZoneStyles['file-drop-zone_button']].join(" ") : fileDropZoneStyles['file-drop-zone_button'];

  return (
    <div
      className={fileDropZoneClasses}
      onDragEnter={(event) => {
        event.preventDefault();
        setIsHovered(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHovered(true);
      }}
      onDragLeave={(event) => {
        setIsHovered(false);
      }}
      onDrop={handleDrop}
      style={{ border: isHovered ? '1px dashed #0072d2' : '1px dashed #a8a8a8' }}
    >
      <input type={'file'} ref={fileInputRef} multiple={multiple} style={{ display: 'none' }} accept={acceptTypes} onChange={(event) => filesValidation(event.target.files)} />
      {errorMessages.length !== 0 ? (
        <div className={fileDropZoneStyles['file-drop-zone_errors']}>
          {errorMessages.map((errorMsg, index) => <span key={index}>{errorMsg}</span>)}
          <button className={buttonClasses} onClick={() => { setErrorMessages([]); }}>{langDefined.close}</button>
        </div>
      ) : (files.length !== 0 && isHaveFileList === true) ? (
        <div className={filesListStyles["files-list_parent"]}>
          <FilesList files={files} setFiles={setFiles} classNames={classNames} />
          <button className={buttonClasses} onClick={() => { setIsNeedValidationFiles(false); fileInputRef.current.click(); }}>{langDefined.addMoreFiles}</button>
        </div>
      ) : (
        <div className={fileDropZoneStyles['file-drop-zone__upload-box']}>
          <button className={buttonClasses} onClick={() => fileInputRef.current.click()}>{langDefined.selectFile}</button>
          <span>{langDefined.orDragAndDropFiles}</span>
        </div>
      )}
    </div>
  );
};


export const FilesList = (files,classNames) => {
  const getIconFile = (fileName)=>{
    const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
    const iconClasses = classNames && classNames["file-icon"] ? [filesListStyles["file-icon"],classNames["file-icon"]].join(" ") : filesListStyles["file-icon"]

    if(extension === ".docx" || extension === ".pdf" || extension === ".txt" || extension === ".rtf" || extension === ".doc") {
      return <CgFileDocument  className={iconClasses} size={"2em"}/>
    }
    if(extension === ".png" || extension === ".jpg" || extension === ".jpeg" || extension === ".webm" || extension === ".bmp" || extension === ".jpg"){
      return <FaRegFileImage className={iconClasses} size={"2em"}/>
    }
    if(extension === ".mp4" || extension === ".avi" || extension === ".mov" || extension === ".mkv"){
      return <FaRegFileVideo className={iconClasses} size={"2em"}/>
    }
    if(extension === ".mp3" || extension === ".wav" || extension === ".ogg" || extension === ".wma") {
      return <BsFileEarmarkMusic className={iconClasses} size={"2em"}/>
    }
    if(extension === ".ppt" || extension === ".pptx"){
      return <FaRegFilePowerpoint className={iconClasses} size={"2em"}/>
    }

    return <FaRegFile className={iconClasses} size={"2em"}/>
  }
  function trimFileName(fileName, maxLength) {
    console.log()
    if (fileName.split(".")[0].length > maxLength) {
      console.log(1)
      return fileName.split(".")[0].slice(0, maxLength - 3) + "..." +fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    } else {
      return fileName;
    }
  }

  return <div className={filesListStyles['files-list']}>
    {Array.from(files.files).map((file,index) => {
      console.log(getIconFile(file.name))
      return <div key={file + "" + index} className={ classNames && classNames["file-box"] ? [filesListStyles['file-box'],classNames["file-box"]].join(" ") : filesListStyles['file-box']}>
        {getIconFile(file.name)}
        <span className={classNames && classNames["file-box__file-name"] ? [filesListStyles["file-box__file-name"],classNames["file-box__file-name"]].join(" ") : filesListStyles["file-box__file-name"]}>{`${trimFileName(file.name,16)}`}</span>
        <button className={classNames && classNames["file-box__file-button"] ? [filesListStyles["file-box__file-button"],classNames["file-box__file-button"]].join(" "):filesListStyles["file-box__file-button"]} onClick={() => files.setFiles(files.files.filter((el, indexFilter) => index !== indexFilter))}><IoClose/></button>
      </div>
    })}
  </div>
}


