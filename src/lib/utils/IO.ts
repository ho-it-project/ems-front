import { io } from "socket.io-client";

const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const socketSubdomain = process.env.NEXT_PUBLIC_SOCKET_SUBDOMAIN;

// issue: next.config rewrite를 통새 소켓서버와 연결을 시도를 하려하였지만, 실패.
// 에러가 많이발생하였고, 이를 해결하기위해 IO 함수를 만들어서 사용하였습니다.
export const IO = (uri: string) => {
  return io(`${protocol}://${socketSubdomain}.${domain}${uri}`, {
    transports: ["websocket"],
  });
};
