import React, { useEffect, useRef } from "react";
import { classnames } from "../utils/general";
import ACTIONS from "../Actions";

const CustomInput = ({ customInput, socketRef, roomId, onInputChange }) => {
  const inputRef = useRef(customInput);
  const handleInputChange = (input) => {
    inputRef.current = input.target.value;
    onInputChange(input.target.value);
    if (input.target.value) {
      socketRef.current.emit(ACTIONS.INPUT_CHANGE, {
        roomId,
        input: input.target.value,
      });
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.INPUT_CHANGE, ({ input }) => {
        if (input !== null) {
          inputRef.current = input;
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.INPUT_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={handleInputChange}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
