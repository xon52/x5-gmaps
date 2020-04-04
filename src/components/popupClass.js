export default () => {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    this.position = new window.google.maps.LatLng(position.lat, position.lng)
    this.content = content
    // Optionally stop clicks, etc., from bubbling up to the map.
    window.google.maps.OverlayView.preventMapHitsAndGesturesFrom(content)
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(window.google.maps.OverlayView.prototype)
  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.content)
  }
  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.content.parentElement) this.content.parentElement.removeChild(this.content)
  }
  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
    this.content.style.left = divPosition.x + 'px'
    this.content.style.top = divPosition.y + 'px'
  }
  Popup.prototype.setPosition = function(position) {
    this.position = new window.google.maps.LatLng(position.lat, position.lng)
    this.draw()
  }

  return Popup
}
