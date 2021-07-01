import { X5ClusterGroup, X5ClusterItem, X5Pos } from 'src/types/x5gmaps';

// https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
const getMapTile = (pos: X5Pos, zoom: number, size: number) => {
  const scale = 1 << zoom;
  let siny = Math.sin((pos.lat * Math.PI) / 180);
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  const x0 = 0.5 + pos.lng / 360;
  const y0 = 0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI);
  const x = Math.floor((x0 * scale) / size);
  const y = Math.floor((y0 * scale) / size);
  return { x, y };
};

// Get average position
export const getAveragePosition = (items: X5Pos[]) => {
  const _count = items.length;
  const _init = { lat: 0, lng: 0 };
  const _posTot = items.reduce(
    (acc: X5Pos, cur: X5Pos) => ({
      lat: acc.lat + cur.lat,
      lng: acc.lng + cur.lng
    }),
    _init
  );
  const pos = { lat: _posTot.lat / _count, lng: _posTot.lng / _count };
  return pos;
};

// Get weight
const getWeight = (cluster: number, total: number) => {
  return Math.round((cluster / total) * 100);
};

// Organise a given set of items into tiles of given size and appropriate for a given zoom
export const organiseClusters = (
  items: X5ClusterItem[],
  zoom: number,
  maxZoom: number,
  tileSize: number
) => {
  const result: Record<string, X5ClusterGroup> = {};
  // If zoom exceeds maxZoom, do not cluster
  if (zoom >= maxZoom) {
    items.forEach((item, index) => {
      result[index] = { pos: item, items: [item] };
    });
    // Otherwise, cluster
  } else {
    // Cluster by tile
    items.forEach(item => {
      const tile = getMapTile(item, zoom, tileSize);
      const index = `${zoom}-${tile.x}-${tile.y}`;
      if (!result[index])
        result[index] = { pos: { lat: 0, lng: 0 }, items: [] };
      result[index].items.push(item);
    });
    // Set average positions and weights
    for (const [key, value] of Object.entries(result)) {
      result[key].pos = getAveragePosition(value.items);
      result[key].weight = getWeight(value.items.length, items.length);
    }
  }
  return result;
};
