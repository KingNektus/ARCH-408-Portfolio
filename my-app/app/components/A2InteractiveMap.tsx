'use client';

import { useMemo, useState } from 'react';

type Hotspot = {
  id: string;
  number: number;
  route: 'red' | 'blue' | 'purple';
  x: number;
  y: number;
};

const hotspots: Hotspot[] = [
  { id: 'red-1', number: 1, route: 'red', x: 81, y: 58 },
  { id: 'red-2', number: 2, route: 'red', x: 69, y: 55 },
  { id: 'red-3', number: 3, route: 'red', x: 61, y: 49 },
  { id: 'red-4', number: 4, route: 'red', x: 34, y: 36 },
  { id: 'red-5', number: 5, route: 'red', x: 22, y: 30 },
  { id: 'blue-3', number: 3, route: 'blue', x: 6, y: 8 },
  { id: 'blue-4', number: 4, route: 'blue', x: 6, y: 19 },
  { id: 'blue-5', number: 5, route: 'blue', x: 6, y: 25 },
  { id: 'purple-6', number: 6, route: 'purple', x: 10, y: 27 },
  { id: 'purple-7', number: 7, route: 'purple', x: 12, y: 31 },
  { id: 'purple-8', number: 8, route: 'purple', x: 20, y: 34 },
  { id: 'purple-9', number: 9, route: 'purple', x: 27, y: 33 },
  { id: 'purple-10', number: 10, route: 'purple', x: 33, y: 42 },
];

export default function A2InteractiveMap() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeHotspot = useMemo(
    () => hotspots.find((spot) => spot.id === activeId) ?? null,
    [activeId]
  );

  const previewBox = { x: 77, y: 27, w: 20, h: 24 };
  const routeColors = {
    red: '#ef4444',
    blue: '#4f46e5',
    purple: '#a855f7',
  } as const;
  const activeColor = activeHotspot ? routeColors[activeHotspot.route] : '#0f172a';

  return (
    <div className="relative w-full">
      <img src={`${basePath}/A2.png`} alt="A2 node map" className="w-full h-auto object-contain" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {activeHotspot ? (
          <line
            x1={`${activeHotspot.x}%`}
            y1={`${activeHotspot.y}%`}
            x2={`${previewBox.x}%`}
            y2={`${previewBox.y + previewBox.h / 2}%`}
            stroke={activeColor}
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.85"
            className="transition-all duration-500 ease-out"
          />
        ) : null}
      </svg>

      {hotspots.map((spot) => {
        const active = spot.id === activeId;
        return (
          <button
            key={spot.id}
            type="button"
            onClick={() => setActiveId(spot.id)}
            className={`absolute z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full text-xs font-bold text-white shadow-md transition duration-300 ${
              active ? 'scale-110 ring-2 ring-black/30' : 'hover:scale-105'
            }`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={`Open related images for node ${spot.number}`}
            title={`${spot.route} route - node ${spot.number}`}
          >
            <span
              className="flex h-full w-full items-center justify-center rounded-full"
              style={{ backgroundColor: routeColors[spot.route] }}
            >
              {spot.number}
            </span>
          </button>
        );
      })}

      <div
        className={`absolute z-10 -translate-y-1/2 rounded-xl border-2 bg-white p-3 shadow-xl transition-all duration-300 ease-out ${
          activeHotspot ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{
          left: `${previewBox.x}%`,
          top: `${previewBox.y + previewBox.h / 2}%`,
          width: `${previewBox.w}%`,
          minWidth: '180px',
          borderColor: activeColor,
        }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {activeHotspot ? `${activeHotspot.route} node ${activeHotspot.number}` : 'Node'} Preview
        </p>
        <div className="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-slate-400 bg-slate-50 text-center text-xs text-slate-500">
          Empty image box
        </div>
      </div>
    </div>
  );
}
