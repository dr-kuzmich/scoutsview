export interface SimpleObject {
  id: string;
  value: string;
};

export interface Position extends SimpleObject {
};

export interface Team extends SimpleObject {
  players: Player[];
  color?: number; 
};

export interface Player extends SimpleObject {
  team: Team;
  position: Position;
};