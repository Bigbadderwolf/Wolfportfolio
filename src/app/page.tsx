'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiPython,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTensorflow,
} from 'react-icons/si';

/* ================= TYPES ================= */

type Phase =
  | 'static'
  | 'rotate'
  | 'connect'
  | 'explode'
  | 'bounce'
  | 'regroup';

interface Bubble {
  id: number;
  angle: number;
  baseAngle: number;
  radius: number;
  size: number;
  color: string;
  phase: Phase;
}

/* ================= BUBBLE ================= */

const InteractiveBubble = ({
  bubble,
  centerX,
  centerY,
  orbitRadius,
  windowWidth,
  windowHeight,
  phaseRef,
  onUpdate,
  children,
}: any) => {
  const { baseAngle } = bubble;

  const [pos, setPos] = useState({
    x: centerX + orbitRadius * Math.cos(baseAngle),
    y: centerY + orbitRadius * Math.sin(baseAngle),
  });

  const angleRef = useRef(baseAngle);
  const speedRef = useRef(0);
  const vx = useRef(0);
  const vy = useRef(0);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const phase = phaseRef.current;

      if (phase === 'static') {
        setPos({
          x: centerX + orbitRadius * Math.cos(baseAngle),
          y: centerY + orbitRadius * Math.sin(baseAngle),
        });
      }

      if (phase === 'rotate') {
        speedRef.current = Math.min(speedRef.current + 0.0006, 0.04);
        angleRef.current += speedRef.current;
        setPos({
          x: centerX + orbitRadius * Math.cos(angleRef.current),
          y: centerY + orbitRadius * Math.sin(angleRef.current),
        });
      }

      if (phase === 'connect') {
        angleRef.current += speedRef.current;
        setPos({
          x: centerX + orbitRadius * Math.cos(angleRef.current),
          y: centerY + orbitRadius * Math.sin(angleRef.current),
        });
      }

      if (phase === 'explode') {
        setPos(p => ({ x: p.x + vx.current, y: p.y + vy.current }));
      }

      if (phase === 'bounce') {
        setPos(p => {
          let nx = p.x + vx.current;
          let ny = p.y + vy.current;
          if (nx <= 0 || nx >= windowWidth) vx.current *= -1;
          if (ny <= 0 || ny >= windowHeight) vy.current *= -1;
          return { x: nx, y: ny };
        });
      }

      if (phase === 'regroup') {
        const tx = centerX + orbitRadius * Math.cos(baseAngle);
        const ty = centerY + orbitRadius * Math.sin(baseAngle);
        setPos(p => ({
          x: p.x + (tx - p.x) * 0.08,
          y: p.y + (ty - p.y) * 0.08,
        }));
      }

      onUpdate(bubble.id, pos);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phaseRef.current === 'explode') {
      vx.current = Math.cos(baseAngle) * 14;
      vy.current = Math.sin(baseAngle) * 14;
    }
  }, [phaseRef.current]);

  return (
    <motion.div
      className="absolute rounded-full flex items-center justify-center"
      style={{
        width: bubble.size,
        height: bubble.size,
        x: pos.x - bubble.size / 2,
        y: pos.y - bubble.size / 2,
        background: bubble.color,
        filter: 'blur(12px)',
      }}
    >
      {children}
    </motion.div>
  );
};

/* ================= PAGE ================= */

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [positions, setPositions] = useState<Record<number, any>>({});
  const [textIndex, setTextIndex] = useState(0);

  const phaseRef = useRef<Phase>('static');
  const globalTimer = useRef(0);

  /* ROTATING TITLES */
  const texts = [
    { text: 'SOC Analyst', icon: <SiPython size={40} /> },
    { text: 'Cyber Incident Response Specialist', icon: <SiNodedotjs size={40} /> },
    { text: 'Full Stack Developer', icon: <SiReact size={40} /> },
    { text: 'DevOps Engineer', icon: <SiJavascript size={40} /> },
    { text: 'Data Scientist', icon: <SiTensorflow size={40} /> },
    { text: 'LLM Engineer', icon: <SiJavascript size={40} /> },
    { text: 'Audio Engineer', icon: <SiPython size={40} /> },
    { text: 'Music Producer', icon: <SiReact size={40} /> },
    { text: 'Quant and Financial Analyst', icon: <SiPython size={40} /> },
    { text: 'Forex and Crypto Trader', icon: <SiJavascript size={40} /> },
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setTextIndex(p => (p + 1) % texts.length);
    }, 2800);
    return () => clearInterval(i);
  }, []);

  const bubbles: Bubble[] = Array.from({ length: 6 }).map((_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return {
      id: i,
      angle: a,
      baseAngle: a,
      radius: 200,
      size: 80,
      color: 'rgba(0,255,255,0.6)',
      phase: 'static',
    };
  });

  useEffect(() => {
    setMounted(true);
    setW(window.innerWidth);
    setH(window.innerHeight);
    const r = () => {
      setW(window.innerWidth);
      setH(window.innerHeight);
    };
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  /* PHASE MACHINE */
  useEffect(() => {
    const loop = () => {
      globalTimer.current++;

      if (phaseRef.current === 'static' && globalTimer.current > 60)
        phaseRef.current = 'rotate';

      if (phaseRef.current === 'rotate' && globalTimer.current > 240)
        phaseRef.current = 'connect';

      if (phaseRef.current === 'connect' && globalTimer.current > 300)
        phaseRef.current = 'explode';

      if (phaseRef.current === 'explode' && globalTimer.current > 340)
        phaseRef.current = 'bounce';

      if (phaseRef.current === 'bounce' && globalTimer.current > 520)
        phaseRef.current = 'regroup';

      if (phaseRef.current === 'regroup' && globalTimer.current > 680) {
        phaseRef.current = 'static';
        globalTimer.current = 0;
      }

      requestAnimationFrame(loop);
    };
    loop();
  }, []);

  const updatePos = (id: number, pos: any) => {
    setPositions(p => ({ ...p, [id]: pos }));
  };

  if (!mounted) return null;

  const cx = w / 2;
  const cy = h / 2;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* WEB LINES */}
      {phaseRef.current === 'connect' &&
        Object.values(positions).length > 1 && (
          <svg className="absolute inset-0 pointer-events-none">
            {Object.entries(positions).map(([i, p1]) =>
              Object.entries(positions).map(([j, p2]) =>
                i < j ? (
                  <line
                    key={`${i}-${j}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth={1}
                  />
                ) : null
              )
            )}
          </svg>
        )}

      {/* BUBBLES */}
      {bubbles.map(b => (
        <InteractiveBubble
          key={b.id}
          bubble={b}
          centerX={cx}
          centerY={cy}
          orbitRadius={200}
          windowWidth={w}
          windowHeight={h}
          phaseRef={phaseRef}
          onUpdate={updatePos}
        >
          {texts[textIndex].icon}
        </InteractiveBubble>
      ))}

      {/* ROTATING CENTER TEXT */}
      <div className="absolute inset-0 flex items-center justify-center z-20 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 text-4xl font-semibold"
          >
            {texts[textIndex].icon}
            {texts[textIndex].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HEARTBEAT TEXT */}
      <motion.h1
        className="absolute top-20 w-full text-center text-6xl font-bold text-white z-20"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
          filter: [
            'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
            'drop-shadow(0 0 28px rgba(255,255,255,1))',
            'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
          ],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Welcome to WolfPortfolio
      </motion.h1>
    </div>
  );
};

export default HomePage;

