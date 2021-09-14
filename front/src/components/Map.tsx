import React, { useCallback, useRef } from "react"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { Text } from "@chakra-ui/react"
import { Libraries } from "@react-google-maps/api/dist/utils/make-load-script-url"

const libraries: Libraries = ["places"]

// 地図の大きさ
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

export function GoogleMapComponent() {
  // 地図の読み込み状況
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey /* APIキー */,
    libraries,
  })

  //　API読み込み後に再レンダーを引き起こさないように、useStateではなく、useRefとuseCallbackを使用。
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // 地図が出せない時用
  if (loadError)
    return <Text>読み込みに失敗しました。しばらくしてからお試しください。</Text>
  if (!isLoaded) return <Text>読み込み中です。しばらくお待ちください。</Text>

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle} /* 地図の大きさ */
      zoom={5.5} /* デフォルトズーム倍率 */
      center={{
        lat: 37.0047,
        lng: 137.5936,
      }} /* デフォルトのセンター */
      options={options}
      onLoad={onMapLoad}
    />
  )
}
