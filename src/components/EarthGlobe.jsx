export default function EarthGlobe() {
  return (
    <div className="earth-globe-wrap">
      <iframe
        src="/earth.html"
        title="Earth Globe"
        className="earth-globe-frame"
        allowtransparency="true"
        frameBorder="0"
        scrolling="no"
      />
    </div>
  )
}
