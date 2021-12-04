import React, { useRef, useState, useEffect } from 'react'
// eslint-disable-next-line import/no-webpack-loader-syntax
// @ts-ignore
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { Data } from '../../store'

import './index.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2c2xhc2huaWwiLCJhIjoiY2t3cWZ1cTI2MG03eTJ3cG0ydjJxOW0ycyJ9.ptIELUfLPmK6XPBM8gzncw'

type Props = {
  data: Data
}

const Map: React.FC<Props> = ({ data }: Props) => {
  const mapContainer = useRef(null)
  const map = useRef<any>(null)
  const [lng, setLng] = useState(69.02)
  const [lat, setLat] = useState(61.06)
  const [zoom, setZoom] = useState(6)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div className="section-wrapper">
      <div className="sidebar">
        Долгота: {lng} | Зум: {zoom} | <br /> Широта: {lat}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map
