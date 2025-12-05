'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiPython, SiReact, SiNodedotjs, SiJavascript } from 'react-icons/si';

interface Bubble {
  id: number;
  angle: number;
  radius: number;
  size: number;
  color: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  phase: 'orbit' | 'disperse' | 'regroup';
}

// Particle explosion
const Explosion = ({ x, y }: { x: number; y: number }) => {
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    angle: Math.random() * Math.PI * 2,
    distance: 40 + Math.random() * 50,
  }));

  return (
    <div className="absolute pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="w-2 h-2 bg-white rounded-full absolute"
          initial={{ x, y, scale: 1, opacity: 1 }}
          animate={{
            x: x + Math.cos(p.angle) * p.distance,
            y: y + Math.sin(p.angle) * p.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

// Bubble Component
const InteractiveBubble = ({
  bubble,
  centerX,
  centerY,
  rotateSpeed,
  onExplode,
  windowWidth,
  windowHeight,
  orbitRadius,
  children,
}: {
  bubble: Bubble;
  centerX: number;
  centerY: number;
  rotateSpeed: number;
  onExplode: (id: number) => void;
  windowWidth: number;
  windowHeight: number;
  orbitRadius: number;
  children?: React.ReactNode;
}) => {
  const [angle, setAngle] = useState(bubble.angle);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: centerX + bubble.radius * Math.cos(bubble.angle),
    y: centerY + bubble.radius * Math.sin(bubble.angle),
  });

  const [vx, setVx] = useState((Math.random() - 0.5) * 5);
  const [vy, setVy] = useState((Math.random() - 0.5) * 5);
  const [phase, setPhase] = useState<'orbit' | 'disperse' | 'regroup'>(bubble.phase);

  useEffect(() => {
    let orbitTimeout: NodeJS.Timeout;
    orbitTimeout = setTimeout(() => setPhase('disperse'), 10000); // disperse after 10s

    return () => clearTimeout(orbitTimeout);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (phase === 'orbit') {
        setAngle(prev => prev + rotateSpeed);
        setPosition({
          x: centerX + orbitRadius * Math.cos(angle),
          y: centerY + orbitRadius * Math.sin(angle),
        });
      } else if (phase === 'disperse') {
        let newX = (position.x ?? 0) + vx;
        let newY = (position.y ?? 0) + vy;

        if (newX < 0 || newX > windowWidth) setVx(prev => -prev);
        if (newY < 0 || newY > windowHeight) setVy(prev => -prev);

        setPosition({ x: newX, y: newY });

        // Regroup after some time
        setTimeout(() => setPhase('regroup'), 5000);
      } else if (phase === 'regroup') {
        const targetX = centerX + orbitRadius * Math.cos(angle);
        const targetY = centerY + orbitRadius * Math.sin(angle);
        setPosition(prev => ({
          x: prev.x! + (targetX - prev.x!) * 0.05,
          y: prev.y! + (targetY - prev.y!) * 0.05,
        }));
        if (Math.abs(position.x! - targetX) < 1 && Math.abs(position.y! - targetY) < 1) {
          setPhase('orbit');
        }
      }

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [angle, phase, position, vx, vy, centerX, centerY, orbitRadius, windowWidth, windowHeight]);

  return (
    <>
      {/* Connecting Line only in orbit or regroup */}
      {(phase === 'orbit' || phase === 'regroup') && (
        <svg className="absolute w-full h-full pointer-events-none">
          <line
            x1={centerX}
            y1={centerY}
            x2={position.x}
            y2={position.y}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
          />
        </svg>
      )}

      <motion.div
        className="absolute rounded-full flex items-center justify-center cursor-pointer"
        style={{
          width: bubble.size,
          height: bubble.size,
          x: position.x! - bubble.size / 2,
          y: position.y! - bubble.size / 2,
          background: bubble.color,
          filter: 'blur(12px)',
        }}
        onClick={() => onExplode(bubble.id)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Create bubbles
const createBubbles = (count: number): Bubble[] => {
  const colors = [
    'rgba(255, 0, 255, 0.6)',
    'rgba(0, 255, 255, 0.6)',
    'rgba(255, 255, 0, 0.6)',
    'rgba(0, 255, 0, 0.6)',
    'rgba(255, 0, 127, 0.6)',
    'rgba(127, 0, 255, 0.6)',
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    angle: (i / count) * Math.PI * 2,
    radius: 200 + Math.random() * 50,
    size: 70 + Math.random() * 50,
    color: colors[Math.floor(Math.random() * colors.length)],
    phase: 'orbit',
  }));
};

// HomePage
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const texts = [
    { text: 'Cybersecurity Specialist', icon: <SiPython size={40} /> },
    { text: 'Full Stack Developer', icon: <SiReact size={40} /> },
    { text: 'AI Enthusiast', icon: <SiNodedotjs size={40} /> },
    { text: 'Financial Trader', icon: <SiJavascript size={40} /> },
  ];

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    setBubbles(createBubbles(6));

    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 3000);

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });

    return () => clearInterval(interval);
  }, []);

  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  const orbitRadius = 200;

  const explodeBubble = (id: number) => {
    const b = bubbles.find(b => b.id === id);
    if (!b) return;
    setExplosions(prev => [
      ...prev,
      {
        id,
        x: centerX + (b.radius ?? orbitRadius) * Math.cos(b.angle ?? 0),
        y: centerY + (b.radius ?? orbitRadius) * Math.sin(b.angle ?? 0),
      },
    ]);
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {bubbles.map(b => (
          <InteractiveBubble
            key={b.id}
            bubble={b}
            centerX={centerX}
            centerY={centerY}
            rotateSpeed={0.01 + Math.random() * 0.01}
            onExplode={explodeBubble}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            orbitRadius={orbitRadius}
          >
            {texts[textIndex].icon}
          </InteractiveBubble>
        ))}
      </AnimatePresence>

      {explosions.map(e => (
        <Explosion key={e.id} x={e.x} y={e.y} />
      ))}

      {/* Welcome Header */}
      <motion.h1
        className="absolute top-20 w-full text-center text-5xl md:text-7xl font-bold text-white z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Welcome to WolfPortfolio
      </motion.h1>

      {/* Rotating Skill Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-3xl md:text-5xl flex items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {texts[textIndex].icon}
            {texts[textIndex].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
