import { X5Pos } from 'src/types/x5gmaps';

// Extend bounds
// export const expandBounds = (
//   bounds: google.maps.LatLngBounds,
//   size: number
// ) => {
//   const span = bounds.toSpan();
//   const _bounds = new window.google.maps.LatLngBounds(
//     new window.google.maps.LatLng({
//       lat: bounds.getSouthWest().lat() - (span.lat() * size) / 2,
//       lng: bounds.getSouthWest().lng() - (span.lng() * size) / 2
//     }),
//     new window.google.maps.LatLng({
//       lat: bounds.getNorthEast().lat() + (span.lat() * size) / 2,
//       lng: bounds.getNorthEast().lng() + (span.lng() * size) / 2
//     })
//   );
//   return _bounds;
// };

// Get bounds
export const getBounds = (items: X5Pos[]) => {
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
  const _bounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng({ lat: west, lng: south }, true),
    new window.google.maps.LatLng({ lat: east, lng: north }, true)
  );
  return _bounds;
};
