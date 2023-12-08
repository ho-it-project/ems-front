"use client";

import { useGeoLocation } from "@/hooks/useGeoLocation";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request.store";
import { useEffect, useRef, useState } from "react";
interface KakaoMapProps {
  focus?: boolean;
}
export const KakaoMap = ({ focus }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useGeoLocation();
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);
  const requests = useRequestStore((state) => state.requests);
  useEffect(() => {
    if (!location) return;
    if (!mapRef) return;
    if (!mapRef.current) return;
    const [lat, lng] = location;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(lat, lng);
        const options = {
          center,
          level: 10,
        };
        if (!mapRef.current) return;

        const map = new kakao.maps.Map(mapRef.current, options);
        const marker = new kakao.maps.Marker({
          position: center,
        });
        marker.setMap(map);
        setKakaoMap(map);
      });
    };
  }, [location, focus]);

  useEffect(() => {
    if (!kakaoMap) return;
    if (!mapRef) return;
    if (!mapRef.current) return;
    if (!location) return;
    const [lat, lng] = location;
    const center = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setCenter(center);
    kakaoMap.relayout();
  }, [kakaoMap, mapRef.current?.clientWidth, location]);
  useEffect(() => {
    if (!kakaoMap) return;
    if (!requests) return;
    if (!location) return;
    if (requests.length === 0) {
      const [lat, lng] = location;
      const center = new kakao.maps.LatLng(lat, lng);

      const marker = new kakao.maps.Marker({
        position: center,
      });
      marker.setMap(null);

      kakaoMap.setCenter(center);
      kakaoMap.relayout();

      return;
    }
    if (
      requests.length === 1 &&
      (requests[0].request_status === "ACCEPTED" ||
        requests[0].request_status === "TRANSFER" ||
        requests[0].request_status === "TRANSFER_COMPLETED")
    ) {
      const reuqest = requests[0];

      const {
        emergency_center_name,
        emergency_center_latitude,
        emergency_center_longitude,
      } = reuqest;
      const [lat, lon] = location;
      const emergencyCenter = new kakao.maps.LatLng(
        emergency_center_latitude,
        emergency_center_longitude
      );
      const patient = new kakao.maps.LatLng(lat, lon);

      const marker = new kakao.maps.Marker({
        title: emergency_center_name,
        position: emergencyCenter,
        image: new kakao.maps.MarkerImage(
          "/icon/hospitalMarker.svg",
          new kakao.maps.Size(60, 60),
          {
            alt: "마커 이미지",
          }
        ),
      });

      const polyline = new kakao.maps.Polyline({
        path: [emergencyCenter, patient],
        strokeWeight: 5,
        strokeColor: "#FFAE00",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });
      const bounds = new kakao.maps.LatLngBounds(emergencyCenter, patient);

      kakaoMap.setBounds(bounds);
      polyline.setMap(kakaoMap);
      bounds.extend(emergencyCenter);
      marker.setMap(kakaoMap);
      kakaoMap.relayout();
    }
  }, [requests, kakaoMap, location]);

  return (
    <div className={cn("h-full w-full")}>
      <div className={cn("h-full w-full rounded-lg ")} ref={mapRef}></div>
    </div>
  );
};
