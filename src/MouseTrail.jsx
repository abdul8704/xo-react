import React, { useState, useEffect } from "react";

function MouseTrail() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setTrails(prevTrails => [...prevTrails, newTrail].slice(-15));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute w-4 h-4 rounded-full bg-purple-500/20"
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
            opacity: 1 - (index / trails.length),
            transform: `scale(${1 - (index / trails.length)})`,
            transition: 'all 0.15s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;