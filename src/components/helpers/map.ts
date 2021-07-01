import { X5Pos } from 'src/types/x5gmaps';

// Get bounds
export const getBounds = (items: X5Pos[], buffer = 0) => {
  let north = items[0].lng;
  let south = items[0].lng;
  let west = items[0].lat;
  let east = items[0].lat;
  items.forEach(({ lat, lng }) => {
    if (lng > north) north = lng;
    if (lng < south) south = lng;
    if (lat > east) east = lat;
    if (lat < west) west = lat;
  });
  if (buffer) {
    north -= buffer * (south - north);
    south += buffer * (south - north);
    west -= buffer * (east - west);
    east += buffer * (east - west);
  }
  const _bounds = new globalThis.google.maps.LatLngBounds(
    new globalThis.google.maps.LatLng({ lat: west, lng: south }, true),
    new globalThis.google.maps.LatLng({ lat: east, lng: north }, true)
  );
  return _bounds;
};
