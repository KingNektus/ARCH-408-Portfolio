'use client';

import React, { useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.2;

export default function SvgMapViewer() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const clampZoom = (value: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const updateZoom = (nextZoom: number, anchor?: { x: number; y: number }) => {
    const clampedZoom = clampZoom(nextZoom);
    if (clampedZoom === zoom) return;

    if (!anchor || !viewportRef.current) {
      setZoom(clampedZoom);
      return;
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const vx = anchor.x - centerX;
    const vy = anchor.y - centerY;
    const ratio = clampedZoom / zoom;

    setOffset((current) => ({
      x: vx - (vx - current.x) * ratio,
      y: vy - (vy - current.y) * ratio,
    }));
    setZoom(clampedZoom);
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    updateZoom(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), {
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    dragRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    dragRef.current = { x: event.clientX, y: event.clientY };
    setOffset((current) => ({ x: current.x + dx, y: current.y + dy }));
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleNativeWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    viewport.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleNativeWheel);
  }, []);

  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white shadow-lg">
        <button
          type="button"
          onClick={() => updateZoom(zoom + ZOOM_STEP)}
          className="rounded bg-white/20 px-2 py-1 text-sm font-semibold hover:bg-white/30"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => updateZoom(zoom - ZOOM_STEP)}
          className="rounded bg-white/20 px-2 py-1 text-sm font-semibold hover:bg-white/30"
        >
          -
        </button>
        <button
          type="button"
          onClick={resetView}
          className="rounded bg-white/20 px-2 py-1 text-xs font-semibold hover:bg-white/30"
        >
          Reset
        </button>
        <span className="px-1 text-xs font-medium">{Math.round(zoom * 100)}%</span>
      </div>

      <div
        ref={viewportRef}
        className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
        onWheelCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={`${basePath}/A3.svg`}
            alt="A3 Systems Thinking node map"
            className="max-h-none max-w-none select-none"
            style={{ width: '75%', height: 'auto' }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
