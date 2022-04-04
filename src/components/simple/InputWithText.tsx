import React, { ChangeEvent } from "react";
import "../../styles/simple/InputWithText.css";

interface Props {
  text: string;
  placeholder: string
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

const InputWithText = ({ text, placeholder, onChange }: Props) => {
  return (
    <div className="npm-input-with-text">
      <span className="npm-input-with-text-span">{text}</span>
      <div className="ui small input npm-input-with-text-cont">
        <input type="text" placeholder={placeholder} onChange={onChange}/>
      </div>
    </div>
  );
};

export default InputWithText;
