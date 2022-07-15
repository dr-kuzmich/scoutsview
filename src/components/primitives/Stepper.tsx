import React from "react";
import "../../styles/primitives/Stepper.scss";

interface Props {
  value: number;
  color: string;
  setValue: (v: number) => void;
}

const Stepper = ({ value, color, setValue }: Props) => {
  return (
    <div className="stepper-cont">
      <i className="large minus square icon stepper-button" style={{ display: "table-cell", color: `${color}` }}
        onClick={() => value && setValue(--value)}>
      </i>
      <div className="stepper-text">{value}</div>
      <i className="large plus square icon stepper-button" style={{ display: "table-cell", color: `${color}` }}
        onClick={() => setValue(++value)}>
      </i>
    </div>
  );
};

export default Stepper;
