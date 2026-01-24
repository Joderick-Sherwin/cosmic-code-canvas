import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
  baseX: number;
  baseY: number;
}

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Smooth mouse tracking for orbs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes with base positions
    const nodeCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
    nodesRef.current = Array.from({ length: nodeCount }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.3 : -0.3),
        vy: (Math.random() - 0.5) * 0.8 + (Math.random() > 0.5 ? 0.3 : -0.3),
        radius: Math.random() * 1.2 + 0.5,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    const handleMouseMoveCanvas = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMoveCanvas);

    const animate = () => {
      // Create a trail effect with semi-transparent clear
      ctx.fillStyle = "rgba(3, 0, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Calculate distance from mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Enhanced mouse interaction - stronger attraction/repulsion
        if (dist < 300) {
          const force = (300 - dist) / 300;
          const attractionStrength = 0.0008 * force * force;
          node.vx += dx * attractionStrength;
          node.vy += dy * attractionStrength;
        }

        // Add constant gentle movement using sine waves for organic motion
        const time = Date.now() * 0.001;
        const wanderX = Math.sin(time * 0.5 + node.pulseOffset) * 0.15;
        const wanderY = Math.cos(time * 0.4 + node.pulseOffset * 1.3) * 0.15;
        node.vx += wanderX;
        node.vy += wanderY;

        // Very gentle drift back to base position (weaker to allow more movement)
        const homeForce = 0.00005;
        node.vx += (node.baseX - node.x) * homeForce;
        node.vy += (node.baseY - node.y) * homeForce;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Light damping to maintain momentum
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Wrap around edges
        if (node.x < -50) { node.x = canvas.width + 50; node.baseX = node.x; }
        if (node.x > canvas.width + 50) { node.x = -50; node.baseX = node.x; }
        if (node.y < -50) { node.y = canvas.height + 50; node.baseY = node.y; }
        if (node.y > canvas.height + 50) { node.y = -50; node.baseY = node.y; }

        // Enhanced pulsing effect
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.5 + 0.5;
        const distFromMouse = Math.sqrt(Math.pow(mouse.x - node.x, 2) + Math.pow(mouse.y - node.y, 2));
        const mouseBrightness = Math.max(0, 1 - distFromMouse / 400);
        const glowRadius = node.radius * (1 + pulse * 0.3 + mouseBrightness * 0.3);

        // Draw node glow - scaled down
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius * 8
        );
        const baseOpacity = 0.25 + pulse * 0.25 + mouseBrightness * 0.3;
        gradient.addColorStop(0, `hsla(187, 100%, 50%, ${baseOpacity})`);
        gradient.addColorStop(0.3, `hsla(220, 80%, 60%, ${baseOpacity * 0.5})`);
        gradient.addColorStop(0.6, `hsla(270, 70%, 60%, ${baseOpacity * 0.25})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw node core - smaller
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(187, 100%, ${70 + mouseBrightness * 20}%, ${0.6 + pulse * 0.3 + mouseBrightness * 0.3})`;
        ctx.fill();

        // Draw connections - enhanced near cursor
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distance = Math.sqrt(
            Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
          );

          if (distance < 140) {
            const midX = (node.x + other.x) / 2;
            const midY = (node.y + other.y) / 2;
            const midDistFromMouse = Math.sqrt(Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2));
            const connectionBrightness = Math.max(0, 1 - midDistFromMouse / 300);
            
            const opacity = (1 - distance / 180) * (0.3 + connectionBrightness * 0.5);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            
            const lineGradient = ctx.createLinearGradient(
              node.x, node.y, other.x, other.y
            );
            lineGradient.addColorStop(0, `hsla(187, 100%, 50%, ${opacity})`);
            lineGradient.addColorStop(0.5, `hsla(270, 70%, 60%, ${opacity * 0.7})`);
            lineGradient.addColorStop(1, `hsla(187, 100%, 50%, ${opacity})`);
            
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.5 + connectionBrightness * 1;
            ctx.stroke();
          }
        }
      });

      // Draw cursor glow effect
      const cursorGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 200
      );
      cursorGradient.addColorStop(0, "hsla(187, 100%, 50%, 0.15)");
      cursorGradient.addColorStop(0.5, "hsla(270, 70%, 60%, 0.05)");
      cursorGradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
      ctx.fillStyle = cursorGradient;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMoveCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "hsl(240 20% 2%)" }}
      />
      {/* Overlay gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-background/30 to-background" />
      
      {/* Cursor-reactive floating orbs */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, hsl(187 100% 50%) 0%, transparent 70%)",
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Ambient orbs */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, hsl(187 100% 50%) 0%, transparent 70%)" }}
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, hsl(270 70% 60%) 0%, transparent 70%)" }}
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, hsl(320 70% 50%) 0%, transparent 70%)" }}
        animate={{
          x: [0, 40, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  );
};
