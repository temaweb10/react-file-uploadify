# react-file-uploadify

> A simple, flexible to use reactjs drag-and-drop file library. Users can drag and drop files, delete selected files. You can easily limit the accepted files by their minimum and maximum number, the total size of all selected files in byte , and file types

[![NPM](https://img.shields.io/npm/v/react-file-uploadify.svg)](https://www.npmjs.com/package/react-file-uploadify) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-file-uploadify
```

## Usage

```jsx

import {FileDropZone} from 'react-file-uploadify'
import 'react-file-uploadify/dist/index.css'
import React,{useState} from "react";

const App = () => {
  const [files,setFiles] = useState([])

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  return <FileDropZone onChange={updateFiles} maxFiles={5} maxFileSizeInBytes={455500} multiple={true} acceptTypes={".jpg, .jpeg, .png"}
  />

}

export default App
```
## Properties
| Prop       | Default   | Type    | Description                  |
|------------|-----------|---------|------------------------------|
| multiple      | false     | Boolean |    The ability to select multiple files                          |
| acceptTypes      | undefined | String  |   File types that can be selected                           |
| maxFiles      | undefined | Number  |     Maximum number of accepted files                         |
| maxFilesSizeInBytes      |     undefined      |  Number       |              The maximum number of bytes of all selected files                |
| onChange      |      undefined     |   ChangeEventHandler      |                              |


## License

MIT © [temaweb10](https://github.com/temaweb10)
