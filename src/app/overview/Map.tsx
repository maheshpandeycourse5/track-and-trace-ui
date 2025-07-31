"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const breweryLocations = [
  { id: 1, name: "Brewery A", lat: 19.4326, lng: -99.1332, status: "green" },
  { id: 2, name: "Brewery B", lat: 20.6597, lng: -103.3496, status: "yellow" },
  { id: 3, name: "Brewery C", lat: 25.6866, lng: -100.3161, status: "red" },
];

const breweryData = [
  {
    id: 1,
    name: "Brewery A",
    accepted: 220,
    rejected: { before4PM: 12, after4PM: 11 },
    etaBreaches: 13,
    critical2hrs: 8,
    noPlate: 33,
    status: "green",
  },
  {
    id: 2,
    name: "Brewery B",
    accepted: 255,
    rejected: { before4PM: 15, after4PM: 13 },
    etaBreaches: 15,
    critical2hrs: 9,
    noPlate: 38,
    status: "yellow",
  },
  {
    id: 3,
    name: "Brewery C",
    accepted: 158,
    rejected: { before4PM: 8, after4PM: 8 },
    etaBreaches: 10,
    critical2hrs: 5,
    noPlate: 24,
    status: "red",
  },
];

const getStatusColor = (status: string) =>
  status === "green" ? "#4CAF50" : status === "yellow" ? "#FFC107" : "#F44336";

const getCriticalNotifications = (brewery: any) => {
  const criticals: string[] = [];
  if (brewery.etaBreaches > 0)
    criticals.push(`${brewery.etaBreaches} ETA Breaches`);
  if (brewery.critical2hrs > 0)
    criticals.push(`${brewery.critical2hrs} Critical (2 hrs)`);
  if (brewery.noPlate > 0)
    criticals.push(`${brewery.noPlate} Folios without plate`);
  return criticals;
};

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [atlasMap, setAtlasMap] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState<number | null>(null);

  // Load Azure Maps
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // Initialize map and markers
  useEffect(() => {
    let map: any;
    const initializeMap = () => {
      // @ts-ignore
      const atlas = window.atlas;
      map = new atlas.Map(mapRef.current, {
        center: [-99.1332, 23.6345],
        zoom: 5,
        style: "grayscale_light",
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: "your key",
        },
      });

      map.events.add("ready", () => {
        breweryLocations.forEach((brewery) => {
          const color = getStatusColor(brewery.status);
          const marker = new atlas.HtmlMarker({
            color,
            text: brewery.name.slice(-1),
            position: [brewery.lng, brewery.lat],
            htmlContent: `<div style="width:28px;height:28px;border-radius:50%;background:${color};
                color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;
                cursor:pointer;border:2px solid #fff">${brewery.name.slice(
                  -1
                )}</div>`,
          });
          marker.metadata = { id: brewery.id };
          map.markers.add(marker);

          map.events.add("click", marker, () => {
            setSelectedBrewery((prev) =>
              prev === brewery.id ? null : brewery.id
            );
          });
        });
        setMapLoaded(true);
        setAtlasMap(map);
      });
    };

    const checkAtlas = setInterval(() => {
      // @ts-ignore
      if (window.atlas && mapRef.current) {
        clearInterval(checkAtlas);
        initializeMap();
      }
    }, 100);

    return () => {
      if (map) map.dispose();
      clearInterval(checkAtlas);
    };
  }, []);

  // Popup with chart inside (using shadcn chart via Recharts)
  useEffect(() => {
    if (!atlasMap || !mapLoaded) return;

    // @ts-ignore
    const atlas = window.atlas;
    if (selectedBrewery) {
      const brewery = breweryData.find((b) => b.id === selectedBrewery);
      const loc = breweryLocations.find((b) => b.id === selectedBrewery);

      if (brewery && loc) {
        const totalRejected =
          brewery.rejected.before4PM + brewery.rejected.after4PM;

        const popupHtml = `
          <div style="min-width:240px;max-width:280px;background:#fff;border-radius:8px;
          box-shadow:0 2px 8px rgba(0,0,0,0.2);padding:12px;font-size:14px;">
            <h4 style="margin:0 0 8px 0;color:${getStatusColor(
              brewery.status
            )};">
              ${brewery.name}
            </h4>
            <p><b>Accepted:</b> ${brewery.accepted}<br/>
            <b>Rejected:</b> ${totalRejected}</p>
          </div>
        `;

        if (atlasMap.__popup) atlasMap.popups.remove(atlasMap.__popup);
        atlasMap.__popup = new atlas.Popup({
          position: [loc.lng, loc.lat],
          content: popupHtml,
          pixelOffset: [0, -30],
        });
        atlasMap.popups.add(atlasMap.__popup);
      }
    } else if (atlasMap.__popup) {
      atlasMap.popups.remove(atlasMap.__popup);
    }
  }, [selectedBrewery, atlasMap, mapLoaded]);

  // Calculate totals
  const totalRejected = breweryData.reduce(
    (sum, b) => sum + b.rejected.before4PM + b.rejected.after4PM,
    0
  );
  const totalEtaBreaches = breweryData.reduce(
    (sum, b) => sum + (b.etaBreaches || 0),
    0
  );
  const totalCritical = breweryData.reduce(
    (sum, b) => sum + (b.critical2hrs || 0),
    0
  );
  const totalNoPlate = breweryData.reduce(
    (sum, b) => sum + (b.noPlate || 0),
    0
  );

  return (
    <div className="w-screen h-screen relative">
      {/* Map */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Vertical Stats Cards on the left */}
      <div className="absolute top-0 left-0 h-full flex flex-col justify-center gap-6 p-6 z-10">
        <div className="bg-gray-100 rounded-xl shadow-lg px-8 py-6 min-w-[180px] text-center font-semibold text-lg border-l-4 border-[#F44336]">
          <div className="text-sm text-gray-500 font-medium">
            Total Rejected
          </div>
          <div className="text-2xl text-[#F44336] mt-1">{totalRejected}</div>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-lg px-8 py-6 min-w-[180px] text-center font-semibold text-lg border-l-4 border-[#1976D2]">
          <div className="text-sm text-gray-500 font-medium">
            Total ETA Breaches
          </div>
          <div className="text-2xl text-[#1976D2] mt-1">{totalEtaBreaches}</div>
        </div>
        <div className="bg-gray-100 rounded-xl shadow-lg px-8 py-6 min-w-[180px] text-center font-semibold text-lg border-l-4 border-[#FFC107]">
          <div className="text-sm text-gray-500 font-medium">
            Total Critical
          </div>
          <div className="text-2xl text-[#FFC107] mt-1">{totalCritical}</div>
        </div>
        <div className="bg-gray-100  rounded-xl shadow-lg px-8 py-6 min-w-[180px] text-center font-semibold text-lg border-l-4 border-[#4CAF50]">
          <div className="text-sm text-gray-500 font-medium">
            Total Folio Without Plates
          </div>
          <div className="text-2xl text-[#4CAF50] mt-1">{totalNoPlate}</div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
