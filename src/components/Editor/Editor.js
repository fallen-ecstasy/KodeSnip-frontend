import React, {useState} from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const Editor = () => {
  
  const [code, setCode] = useState('');

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
    console.log(value)

  }, []);


  return (
    <div>
    <form >
        <CodeMirror 
          value={code}
          height="10vh"
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
        <button type='submit'>Submit</button>
      </form>
    
    </div>
  )
}

export default Editor