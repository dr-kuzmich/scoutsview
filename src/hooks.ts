import { useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = (value: boolean) => setIsShowing(value);

  return { isShowing, toggle };
};

export const useMovable = (x: number, y: number) => {
  const [dragModeEnabled, setDragMode] = useState(false);
  const [initCoord, setInitCoord] = useState({ x, y });
  const [newCoord, setNewCoord] = useState({ x: initCoord.x, y: initCoord.y });
  const [clickPoint, setClickPoint] = useState({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement>(null);
 
  const enableDragMode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClickPoint({ x: e.clientX, y: e.clientY });
    setDragMode(true);    
  };

  const disableDragMode = () => {
    setDragMode(false);
    setInitCoord({x: newCoord.x, y: newCoord.y});
  };

  const moveAt = (pageX: number, pageY: number) => {
    const x = pageX - clickPoint.x + initCoord.x;
    const y = pageY - clickPoint.y + initCoord.y;
    if(x < 0 || x > document.documentElement.clientWidth - (divRef.current?.clientWidth ?? 0) ||
      y < 0 || y > document.documentElement.clientHeight - (divRef.current?.clientHeight ?? 0))
      return;

    setNewCoord({ x, y });
  };

  const onMouseMove = (e: MouseEvent) => {     
    dragModeEnabled && moveAt(e.pageX, e.pageY);
  };  

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove, false); 
    return () => document.removeEventListener("mousemove", onMouseMove, false);    
  }, [dragModeEnabled]);

  return { divRef, newCoord, enableDragMode, disableDragMode };
};

// It works here, but this solution is not universal, because useEffect doesn't react to ref.current changes.
// Therefore, perhaps, we need to have another realization (a kind of forse update, for example) for other tasks.
export const useTooltip = (text: string, deps: React.DependencyList = []) => {
  const [tooltip, setTooltip] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current && (ref.current.offsetWidth < ref.current.scrollWidth) && setTooltip(text);    
  }, deps);

  return { tooltip, ref };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
