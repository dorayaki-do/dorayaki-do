import React, { useState } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { Event, MapInfo } from "./MapInfo"

export function PlaceInfo() {
  // アイコンをどこに置くか
  const places: Event[] = [
    {
      title: "ハイキュー!!ウィーク in 仙台",
      id: "1",
      info: `ハイキュー恒例のご当地イベント「ハイキュー!!ウィーク」が今年も開催決定！
              今年の描き下ろしイラストのテーマは「ご当地仙台の夏祭り」
              浴衣を着たキャラクターの描き下ろしイラストのグッズも販売いたします！
              （同期間に受注通販を予定しております。）
              その他、ご当地仙台の名物を食べて、限定特典がもらえるテイクアウトラリーも同時開催！
              詳細は公式サイトをチェック！`,
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 35.048225, lng: 134.49701 },
    },
    {
      title: "event2",
      id: "2",
      info: "info2",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 44.048225, lng: 142.49701 },
    },
    {
      title: "event3",
      id: "3",
      info: "info3",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 32.048225, lng: 130.49701 },
    },
    {
      title: "event4",
      id: "4",
      info: "info4",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 37.048225, lng: 138.49701 },
    },
    {
      title: "event5",
      id: "5",
      info: "info5",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 38.048225, lng: 140.49701 },
    },
    {
      title: "event6",
      id: "6",
      info: "info6",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 43.048225, lng: 141.49701 },
    },
    {
      title: "event7",
      id: "7",
      info: "info7",
      startDate: new Date(),
      endDate: new Date(),
      location: { lat: 26.048225, lng: 133.49701 },
    },
  ]

  const [selected, setSelected] = useState<Event>(null)

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.location.lat * marker.location.lng}`}
          position={{
            lat: marker.location.lat,
            lng: marker.location.lng,
          }}
          onClick={() => {
            setSelected(marker)
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
          <MapInfo event={selected} />
        </InfoWindow>
      )}
    </>
  )
}
