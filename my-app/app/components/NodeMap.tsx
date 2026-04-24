'use client';

import React, { useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function NodeMap() {
  const data = useMemo(() => {
    const nodes = [
      // Core Categories
      { id: 'Tech', name: 'Technology', group: 'core', size: 25, color: '#000000' },
      { id: 'Phys', name: 'Physical', group: 'physical', size: 20, color: '#1d4ed8' },
      { id: 'Digi', name: 'Digital', group: 'digital', size: 20, color: '#ea580c' },
      { id: 'Info', name: 'Information', group: 'info', size: 18, color: '#f43f5e' },
      { id: 'People', name: 'People', group: 'people', size: 18, color: '#3b82f6' },
      { id: 'Events', name: 'Events', group: 'events', size: 18, color: '#059669' },

      // Physical & Infrastructure
      { id: 'Infra', name: 'Physical Infrastructure', group: 'physical', size: 12, color: '#60a5fa' },
      { id: 'Appl', name: 'Appliances', group: 'physical', size: 12, color: '#60a5fa' },
      { id: 'HVAC', name: 'HVAC', group: 'physical', size: 8, color: '#93c5fd' },
      { id: 'Elev', name: 'Elevators', group: 'physical', size: 8, color: '#93c5fd' },
      { id: 'Print', name: 'Printers', group: 'physical', size: 8, color: '#93c5fd' },

      // Digital & Software
      { id: 'Soft', name: 'Software Applications', group: 'digital', size: 12, color: '#fb923c' },
      { id: 'Disp', name: 'Digital Displays', group: 'digital', size: 12, color: '#fb923c' },
      { id: 'AI', name: 'Artificial Intelligence', group: 'digital', size: 8, color: '#fdba74' },
      { id: 'Addict', name: 'Digital Addictions', group: 'digital', size: 8, color: '#fdba74' },

      // Events & Info
      { id: 'Work', name: 'Workshops', group: 'events', size: 8, color: '#34d399' },
      { id: 'Comp', name: 'Programming Competitions', group: 'events', size: 8, color: '#34d399' },
      { id: 'LMS', name: 'Learning Platforms', group: 'info', size: 10, color: '#fda4af' },
      { id: 'Inter', name: 'The Internet', group: 'info', size: 10, color: '#fda4af' },
    ];

    const links = [
      { source: 'Tech', target: 'Phys', value: 4 },
      { source: 'Tech', target: 'Digi', value: 4 },
      { source: 'Phys', target: 'Infra', value: 2 },
      { source: 'Phys', target: 'Appl', value: 2 },
      { source: 'Infra', target: 'HVAC', value: 1 },
      { source: 'Appl', target: 'Print', value: 1 },
      { source: 'Digi', target: 'Soft', value: 2 },
      { source: 'Digi', target: 'Disp', value: 2 },
      { source: 'Soft', target: 'AI', value: 1 },
      { source: 'Events', target: 'Work', value: 1 },
      { source: 'Events', target: 'Comp', value: 1 },
      { source: 'Info', target: 'LMS', value: 1 },
      { source: 'Info', target: 'Digi', value: 2 },
      { source: 'People', target: 'Events', value: 2 },
    ];

    return { nodes, links };
  }, []);

  return (
    <div className="w-full h-full bg-slate-50">
      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        linkWidth={(link: any) => link.value || 1}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          // SAFETY CHECK: Ensure coordinates are numbers
          if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

          const size = node.size || 5;
          const label = node.name;
          const fontSize = 14 / globalScale;
          
          // RADIAL GRADIENT
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size);
          gradient.addColorStop(0, node.color || '#cccccc');
          gradient.addColorStop(0.8, node.color || '#cccccc');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fade to transparent

          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
          ctx.fillStyle = gradient;
          ctx.fill();

          // LABEL
          ctx.font = `${fontSize}px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#1e293b';
          ctx.fillText(label, node.x, node.y + (size + 8));
        }}
        // LINE GRADIENT EFFECT (via Alpha)
        linkCanvasObjectMode={() => 'after'}
        linkCanvasObject={(link: any, ctx: CanvasRenderingContext2D) => {
          if (!link.source.x || !link.target.x) return;
          
          // Create a linear gradient from source node to target node
          const lineGrad = ctx.createLinearGradient(
            link.source.x, link.source.y, 
            link.target.x, link.target.y
          );
          lineGrad.addColorStop(0, link.source.color || '#cbd5e1');
          lineGrad.addColorStop(1, link.target.color || '#cbd5e1');

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = link.value || 1;
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.stroke();
        }}
      />
    </div>
  );
}