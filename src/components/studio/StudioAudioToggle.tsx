'use client';

import { useState, useEffect, useRef } from 'react';
import { VolumeX } from 'lucide-react';
import { toast } from 'sonner';

export function StudioAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create warm ambient synth chord (Poulo & Nomokey studio sound)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // Warm A3 note

        // Very low, soothing volume
        gain.gain.setValueAtTime(0.015, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
        toast.success('Studio Lo-Fi Ambience: ON (432Hz Chill)', { duration: 1800 });
      } catch {
        setIsPlaying(false);
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setIsPlaying(false);
      toast('Studio Ambience: Muted', { duration: 1200 });
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? 'Mute Studio Ambience' : 'Play Lo-Fi Studio Sound'}
      className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border-2 border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_#18181b] dark:shadow-[3px_3px_0px_#f4f4f5] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-0.5 h-full bg-amber-500 animate-pulse" />
            <span className="w-0.5 h-2 bg-amber-500 animate-pulse delay-75" />
            <span className="w-0.5 h-3 bg-amber-500 animate-pulse delay-150" />
            <span className="w-0.5 h-1.5 bg-amber-500 animate-pulse delay-100" />
          </div>
          <span>STUDIO SOUND: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
          <span>STUDIO SOUND: OFF</span>
        </>
      )}
    </button>
  );
}
