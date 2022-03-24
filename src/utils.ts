const positionNames = ["GK", "SW", "LFB", "CB", "RFB", "LWB", "DM", "RWB", "LM", "CM", "RM", "AM", "LF", "CF", "RF"];
// TODO Memo?
export const positions = positionNames.map((v, i) => ({id: i.toString(), value: v}));
// export const positions = positionNames.map((v, i) => {
//   console.log("positions");
//   return {id: i.toString(), name: v};
// });


// TODO Investigate!
type HandledMaps = WindowEventMap & DocumentEventMap & HTMLElementEventMap;
export const addDomListener = <N, K extends keyof HandledMaps>(node: N, type: K, 
  listener: N extends { addEventListener: (type: K, listener: (this: N, ev: HandledMaps[K]) => any) => void; } 
? 
(this: N, ev: HandledMaps[K]) => any : never)
: 
(() => void) => {
  (node as any).addEventListener(type, listener);
  return () => (node as any).removeEventListener(type, listener);
};