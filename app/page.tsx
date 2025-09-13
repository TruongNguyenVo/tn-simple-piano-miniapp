'use client';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useEffect } from 'react';
import Piano from './components/Piano';

export default function Page() {
   const { setFrameReady, isFrameReady } = useMiniKit();
  useEffect(() => {
    if (!isFrameReady) setFrameReady();
  }, [isFrameReady, setFrameReady]);
  return (
    <div>
      <Piano />
    </div>
  )
}
