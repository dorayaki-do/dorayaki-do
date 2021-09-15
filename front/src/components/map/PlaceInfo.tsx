import React, { useEffect, useState } from "react"
import { Marker, InfoWindow } from "@react-google-maps/api"
import { Event, MapInfo } from "./MapInfo"
import axios from "axios"
import { API_ENDPOINT } from "../../utils/apiEndPoint"

export function PlaceInfo() {
  const [eventData, setEventData] = useState([])

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/users/me/events`)
      .then((res) => {
        console.log(res)
        setEventData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  // アイコンをどこに置くか
  // const places: Event[] = [
  //   {
  //     title: "ハイキュー!!ウィーク in 仙台",
  //     id: "1",
  //     info: `ハイキュー恒例のご当地イベント「ハイキュー!!ウィーク」が今年も開催決定！
  //             今年の描き下ろしイラストのテーマは「ご当地仙台の夏祭り」
  //             浴衣を着たキャラクターの描き下ろしイラストのグッズも販売いたします！
  //             （同期間に受注通販を予定しております。）
  //             その他、ご当地仙台の名物を食べて、限定特典がもらえるテイクアウトラリーも同時開催！
  //             詳細は公式サイトをチェック！`,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 35.048225, lng: 134.49701 },
  //   },
  //   {
  //     title: "event2",
  //     id: "2",
  //     info: "info2",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 44.048225, lng: 142.49701 },
  //   },
  //   {
  //     title: "event3",
  //     id: "3",
  //     info: "info3",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 32.048225, lng: 130.49701 },
  //   },
  //   {
  //     title: "event4",
  //     id: "4",
  //     info: "info4",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 37.048225, lng: 138.49701 },
  //   },
  //   {
  //     title: "event5",
  //     id: "5",
  //     info: "info5",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 38.048225, lng: 140.49701 },
  //   },
  //   {
  //     title: "event6",
  //     id: "6",
  //     info: "info6",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 43.048225, lng: 141.49701 },
  //   },
  //   {
  //     title: "event7",
  //     id: "7",
  //     info: "info7",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     location: { lat: 26.048225, lng: 133.49701 },
  //   },
  // ]

  const places = eventData
  const [selected, setSelected] = useState<Event>(null)

  return (
    <>
      {places.map((marker) => (
        <Marker
          key={`${marker.Latitude * marker.Longitude}`}
          position={{
            lat: Number(marker.Latitude),
            lng: Number(marker.Longitude),
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
            lat: Number(selected.Latitude),
            lng: Number(selected.Longitude),
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
