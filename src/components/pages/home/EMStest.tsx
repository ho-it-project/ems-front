"use client";

import React from "react";
import useSWR from "swr";
const EMStest = () => {
  const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());
  const { data } = useSWR("/api/ems", fetcher);
  return <>{data}</>;
};

export default React.memo(EMStest);
