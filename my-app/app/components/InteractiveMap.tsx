'use client';

import dynamic from 'next/dynamic';

// We move the dynamic import here, inside a Client Component
const NodeMap = dynamic(() => import('./NodeMap'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-slate-100 animate-pulse text-gray-400">Loading Map...</div>
});

export default function InteractiveMap() {
  return <NodeMap />;
}