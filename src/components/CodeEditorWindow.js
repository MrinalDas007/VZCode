import React, { useEffect, useRef, useState } from "react";
import ACTIONS from "../Actions";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({
  onChange,
  language,
  code,
  theme,
  socketRef,
  roomId,
  onCodeChange,
}) => {
  const editorRef = useRef(null);
  const codeRef = useRef(code);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const handleEditorChange = (value, event) => {
    codeRef.current = value;
    onChange("code", value);
    onCodeChange(value);
    if (!event.isFlush) {
      socketRef.current.emit(ACTIONS.CODE_CHANGE, {
        roomId,
        code: value,
      });
    }
  };

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editorRef.current.setValue(codeRef.current);
    setEditorLoaded(true);
  }

  useEffect(() => {
    if (editorLoaded && socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [editorLoaded, socketRef.current]);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={code}
        theme={theme}
        defaultValue={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        id="realtimeEditor"
      />
    </div>
  );
};
export default CodeEditorWindow;
