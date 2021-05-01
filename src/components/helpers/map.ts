// Extend bounds
export const expandBounds = (
  bounds: google.maps.LatLngBounds,
  size: number
) => {
  const span = bounds.toSpan();
  const _bounds = new window.google.maps.LatLngBounds(
    new window.google.maps.LatLng(
      {
        lat: bounds.getSouthWest().lat() - (span.lat() * size) / 2,
        lng: bounds.getSouthWest().lng() - (span.lng() * size) / 2
      },
      true
    ),
    new window.google.maps.LatLng(
      {
        lat: bounds.getNorthEast().lat() + (span.lat() * size) / 2,
        lng: bounds.getNorthEast().lng() + (span.lng() * size) / 2
      },
      true
    )
  );
  return _bounds;
};
