import React, { useState } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"

type Place = { info: string; location: { lat: number; lng: number } }

export function PlaceInfo() {
  // アイコンをどこに置くか
  const places: Place[] = [
    { info: "info1", location: { lat: 35.048225, lng: 134.49701 } },
    { info: "info2", location: { lat: 44.048225, lng: 142.49701 } },
    { info: "info3", location: { lat: 32.048225, lng: 130.49701 } },
    { info: "info4", location: { lat: 37.048225, lng: 138.49701 } },
    { info: "info5", location: { lat: 38.048225, lng: 140.49701 } },
    { info: "info6", location: { lat: 43.048225, lng: 141.49701 } },
    { info: "info7", location: { lat: 26.048225, lng: 133.49701 } },
  ]

  const [selected, setSelected] = useState<Place>(null)

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onMouseOver={() => {
            setSelected(marker)
          }}
        />
      ))}

      {selected && (
        // Markerにマウスオーバーされたときに表示
        <InfoWindow
          position={{
            lat: selected.location.lat,
            lng: selected.location.lng,
          }}
          onCloseClick={() => {
            setSelected(null)
          }}
        >
          <div>{selected.info}</div>
        </InfoWindow>
      )}
    </>
  )
}
