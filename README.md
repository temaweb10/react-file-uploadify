# react-file-uploadify

> A flexible and customizable reactjs file library with the ability to drag and drop files. Users can drag and drop files and delete selected files. You can easily customize the component by adding your own classes to props, limit the number of accepted files to their minimum and maximum number, the total size of all selected files in bytes, MB and file types. Via props, you can select the language, by default "en", "ru" is still available

[![NPM](https://img.shields.io/npm/v/react-file-uploadify.svg)](https://www.npmjs.com/package/react-file-uploadify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

#
![alt-text](https://github.com/temaweb10/media/blob/main/demo.gif?raw=true)

## Install

```bash
npm install --save react-file-uploadify
```


## Usage

```jsx
import {FileDropZone} from 'react-file-uploadify'
import 'react-file-uploadify/dist/index.css'
import React,{useState} from "react";
import myClassNames from './myClassNames.module.css'
const App = () => {
  const [files,setFiles] = useState([])
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  return <div style={{width:"600px",height:"300px",margin:"32px"}}>
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
        {"file-drop-zone_box":myClassNames.myFileDropZoneBoxClass,
          "file-drop-zone_button":myClassNames.myButtonClass,
          "file-icon":myClassNames.myFileIconClass,
          "file-box":myClassNames.myFileBoxClass,
          "file-box__file-button":myClassNames.myFileButton
        }
      }
    />
  </div>

}

export default App

```
## Properties
| Prop       | Default   | Type               | Description                                                                                                                                                                                                   |
|------------|-----------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `multiple`      | false     | Boolean            | The ability to select `multiple` files                                                                                                                                                                        |
| `acceptTypes`      | undefined | Array              | File `types` that can be selected                                                                                                                                                                             |
| `maxFiles`      | undefined | Number             | `Maximum` number of accepted files                                                                                                                                                                            |
| `maxFilesSizeInMb`      | undefined | Number             | The `maximum` number of mb of all selected files                                                                                                                                                              |
| `maxFilesSizeInBytes`      | undefined | Number             | The `maximum` number of bytes of all selected files                                                                                                                                                           |
| `haveFileList`      | true      | Boolean            | Show a list of selected files                                                                                                                                                                                 |
| `classNames`      | undefined | Object             | {<br/>"file-drop-zone_box":"myBoxClass",<br/> "file-drop-zone_button":"myButtonClass",<br/> "file-icon":"myFileIconClass",<br/> "file-box":"myFileBoxClass",<br/>"file-box__file-button":"myFileButton"<br/>}
                                              |
| `lang`      | en        | String             | The interface language is `en` and `ru`                                                                                                                                                                       |
| `onChange`      | undefined | ChangeEventHandler | The selected files are in the function argument                                                                                                                                                               |


## License

MIT © [temaweb10](https://github.com/temaweb10)
