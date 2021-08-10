export interface X5Pos {
  lat: number;
  lng: number;
}

export interface X5ClusterItem extends X5Pos {
  id?: string;
  title?: string;
  visible?: boolean;
  icon?: string | google.maps.Icon;
  label?: string | google.maps.MarkerLabel;
  opacity?: string | number;
  zIndex?: string | number;
}

export interface X5ClusterGroup {
  pos: X5Pos;
  items: X5ClusterItem[];
  weight?: number;
}

export interface X5ClusterOptions {
  minZoom?: number;
  maxZoom?: number;
  tileSize?: number;
  highPercentage?: number;
  lowPercentage?: number;
}

export interface X5OptionsInterface {
  key: string;
  libraries: Array<string>;
}
