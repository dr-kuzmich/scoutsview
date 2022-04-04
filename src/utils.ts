import { Settings } from "./types";

export const settings: Settings = {
  dashboardMode: {
    brief: "brief",
    full: "full",
  },
};

export const positionNames = ["GK", "SW", "LFB", "CB", "RFB", "LWB", "DM", "RWB", "LM", "CM", "RM", "AM", "LF", "CF", "RF"];

export const addMouseDownListener = <N>(
  node: N, 
  type: "mousedown", 
  listener: N extends { addEventListener: (type: "mousedown", listener: (this: N, ev: MouseEvent) => any) => void; } 
    ? (this: N, ev: MouseEvent) => any : never
): (() => void) => {
  (node as any).addEventListener(type, listener);
  return () => (node as any).removeEventListener(type, listener);
};
