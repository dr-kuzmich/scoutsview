import { useMemo, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { Position } from "./types";
import { positionNames } from "./utils";

export const usePositions = (): Position[] => useMemo(() => positionNames.map((v, i) => ({ id: `pos_${i.toString()}`, value: v })), []);

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = (value: boolean) => setIsShowing(value);

  return {
    isShowing,
    toggle,
  };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
