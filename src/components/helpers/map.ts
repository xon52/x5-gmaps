import { X5Pos } from 'src/types/x5gmaps';
const EXTEND = 0.1;

// Get bounds
export const getBounds = (items: X5Pos[]) => {
  const _bounds = new globalThis.google.maps.LatLngBounds(items[0], items[0]);
  items.forEach(e => _bounds.extend(e));
  return _bounds;
};

// Get bounds
export const extendBounds = (bounds: google.maps.LatLngBounds) => {
  const span = bounds.toSpan().toJSON();
  const north = Math.min(bounds.toJSON().north + EXTEND * span.lat, +89);
  const south = Math.max(bounds.toJSON().south - EXTEND * span.lat, -89);
  const west = Math.max(bounds.toJSON().west - EXTEND * span.lng, -180);
  const east = Math.min(bounds.toJSON().east + EXTEND * span.lng, +180);
  return new globalThis.google.maps.LatLngBounds(
    new globalThis.google.maps.LatLng({ lat: south, lng: west }),
    new globalThis.google.maps.LatLng({ lat: north, lng: east })
  );
};
