export interface X5Pos {
  lat: number;
  lng: number;
  id?: string;
  title?: string;
}

export interface ClusterGroup {
  pos: X5Pos;
  items: X5Pos[];
  weight?: number;
}

export interface ClusterOptions {
  minZoom?: number;
  maxZoom?: number;
  tileSize?: number;
  highPercentage?: number;
  lowPercentage?: number;
}

export interface OptionsInterface {
  key: string;
  libraries: Array<string>;
}
