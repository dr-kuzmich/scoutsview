import classnames from "classnames";
import React, { useState } from "react";
import { addDomListener } from "../../utils";
import "../../styles/simple/Dropdown.css";
import { SimpleObject } from "../../types";

interface Props {
  values: SimpleObject[];
  placeholder: string
  selectedId: string;
  setSelectedId: (value: string) => void;
}

const Dropdown = ({values, placeholder, selectedId, setSelectedId}: Props) => {  
  const [isVisible, setIsVisible] = useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => (!ref.current?.contains(event.target as Node)) && setIsVisible(false);
    return addDomListener(window, "mousedown", handleClickOutside);
  }, []);
  
  return (
    <div ref={ref} className="dropdown-main-cont">
      <div className="dropdown-cont" onClick={() => setIsVisible(!isVisible)}>
        <div className="ui small input dropdown-input">
          <input type="text" readOnly placeholder={placeholder} value={values.find(v => v.id === selectedId)?.value ?? ""}/>        
        </div>
        <i className="dropdown icon dropdown-arrow"></i>
      </div>

      <div className={classnames("dropdown-menu-cont", !isVisible && "hidden")}>
        <div className="ui vertical menu dropdown-menu" style={{marginTop: -1, width: "100%"}}>
          {values.map(v => 
            <a key={v.id} className={classnames("item", v.id === selectedId && "active")} style={{height: 35}}
              onClick={() => (setIsVisible(false), setSelectedId(v.id))}>
              {v.value}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Dropdown;