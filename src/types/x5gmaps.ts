export interface X5Pos {
  lat: number;
  lng: number;
}

export interface ClusterItem extends X5Pos {
  id?: string;
  title?: string;
  visible?: boolean;
  icon?: string | google.maps.Icon;
  label?: string | google.maps.Icon;
  opacity?: string | number;
  zIndex?: string | number;
}

export interface ClusterGroup {
  pos: X5Pos;
  items: ClusterItem[];
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
