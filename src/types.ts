type DashboardMode = "brief" | "full";
type PlayerStatus = "new" | "process" | "finished";
type LoadingStatus = "idle" | "pending";

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

export interface Position extends SimpleObject {
  short: string;
}

export interface Team extends SimpleObject {
  color?: number;
}

export interface Player extends SimpleObject {
  teamId: string;
  position: Position;
  status: PlayerStatus;
  shotsSuccessful: number;
  shotsMistaken: number;
  passesSuccessful: number;
  passesMistaken: number;
  airDuelsSuccessful: number;
  airDuelsMistaken: number;
  dribblingsSuccessful: number;
  dribblingsMistaken: number;
  tacklesSuccessful: number;
  tacklesMistaken: number;
}

interface LoadingData {
  loading: LoadingStatus,
  currentRequestId?: string,
  error?: string,
}

export interface TopscorersLoadingData extends LoadingData {
  topscorers: Topscorers;  
}

export interface Topscorers {
  [key: string]: Topscorer
}

export interface Topscorer {
  photo: string;
  name: string;
  club: string;
  goals: number;
  league: string;
  logo: string;
}

export interface Tournament {
  id: number;
  flag: string;
}
