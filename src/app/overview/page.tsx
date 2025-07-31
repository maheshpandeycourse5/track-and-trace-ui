"use client";
import React from "react";
import dynamic from "next/dynamic";
const MapPage = dynamic(() => import("./Map"), { ssr: false });

const MapView = () => {
  return <MapPage />;
};

export default MapView;
