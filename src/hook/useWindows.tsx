import { useEffect, useState } from "react";

export const useWindowSize = () => {
  // 윈도우 사이즈 상태 초기화
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 사이즈를 설정하는 핸들러 함수
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 초기 사이즈 설정
    handleResize();

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함

  return windowSize;
};
