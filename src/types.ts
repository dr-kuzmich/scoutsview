type DashboardMode = "brief" | "full";

export interface Settings { 
  dashboardMode: { 
    brief: DashboardMode,
    full: DashboardMode,
  } 
}

export interface TTA { 
  match?: Match; 
  teams?: Team[];
  players: Player[];
}

export interface Match {
  team0Id: string;
  team1Id: string;
  date: string;
  place: string;
  weather: string;
}

export interface SimpleObject {
  id: string;
  value: string;
}

export type Position = SimpleObject;

export interface Team extends SimpleObject {
  color?: number;
}

export interface Player extends SimpleObject {
  teamId: string;
  position: Position;
  shotsSuccessful: number;
  shotsMistaken: number;
}
