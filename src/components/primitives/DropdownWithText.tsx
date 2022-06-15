import React from "react";
import "../../styles/primitives/DropdownWithText.css";
import { SimpleObject } from "../../types";
import Dropdown from "./Dropdown";

interface Props {
  text: string;
  values: SimpleObject[];
  placeholder: string;
  width: number;
  selectedId: string;
  setSelectedId: (value: string) => void;
}

const DropdownWithText = ({ text, values, placeholder, width, selectedId, setSelectedId }: Props) => {
  return (
    <div className="npm-dropdown-with-text">
      <span className="npm-dropdown-with-text-span">{text}</span>
      <Dropdown values={values} placeholder={placeholder} width={width} selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
};

export default DropdownWithText;
