import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  connections: number[];
  pulseOffset: number;
  layer: number;
}

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });

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
      initializeNetwork();
    };

    // Create a structured neural network grid
    const initializeNetwork = () => {
      const nodes: Node[] = [];
      const cols = Math.floor(canvas.width / 120);
      const rows = Math.floor(canvas.height / 120);
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      // Create grid-based nodes with slight randomization
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * cellWidth + cellWidth / 2;
          const baseY = row * cellHeight + cellHeight / 2;
          // Add randomization for organic feel
          const x = baseX + (Math.random() - 0.5) * cellWidth * 0.6;
          const y = baseY + (Math.random() - 0.5) * cellHeight * 0.6;
          
          nodes.push({
            x,
            y,
            targetX: x,
            targetY: y,
            connections: [],
            pulseOffset: Math.random() * Math.PI * 2,
            layer: row % 3, // Create visual layers
          });
        }
      }

      // Build connections - connect to nearby nodes (neural network structure)
      nodes.forEach((node, i) => {
        const connections: number[] = [];
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            );
            // Connect to nodes within range, with preference for forward connections
            if (dist < 180 && connections.length < 4) {
              connections.push(j);
            }
          }
        });
        node.connections = connections;
      });

      nodesRef.current = nodes;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMoveCanvas = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMoveCanvas);

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = "rgba(3, 0, 20, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Draw connections first (behind nodes)
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          const other = nodes[j];
          if (!other) return;

          const midX = (node.x + other.x) / 2;
          const midY = (node.y + other.y) / 2;
          const distFromMouse = Math.sqrt(
            Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2)
          );
          
          // Signal pulse along connection
          const pulsePosition = (Math.sin(time * 2 + node.pulseOffset) + 1) / 2;
          const pulseX = node.x + (other.x - node.x) * pulsePosition;
          const pulseY = node.y + (other.y - node.y) * pulsePosition;

          // Base connection
          const mouseFactor = Math.max(0, 1 - distFromMouse / 300);
          const baseOpacity = 0.15 + mouseFactor * 0.4;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);

          const gradient = ctx.createLinearGradient(
            node.x, node.y, other.x, other.y
          );
          gradient.addColorStop(0, `hsla(187, 100%, 50%, ${baseOpacity})`);
          gradient.addColorStop(0.5, `hsla(270, 70%, 60%, ${baseOpacity * 0.7})`);
          gradient.addColorStop(1, `hsla(187, 100%, 50%, ${baseOpacity})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8 + mouseFactor * 1.5;
          ctx.stroke();

          // Draw signal pulse traveling along connection
          if (mouseFactor > 0.1 || Math.random() > 0.97) {
            const pulseGlow = ctx.createRadialGradient(
              pulseX, pulseY, 0,
              pulseX, pulseY, 8 + mouseFactor * 10
            );
            pulseGlow.addColorStop(0, `hsla(187, 100%, 70%, ${0.6 + mouseFactor * 0.4})`);
            pulseGlow.addColorStop(0.5, `hsla(270, 70%, 60%, ${0.3 + mouseFactor * 0.2})`);
            pulseGlow.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 6 + mouseFactor * 8, 0, Math.PI * 2);
            ctx.fillStyle = pulseGlow;
            ctx.fill();
          }
        });
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse attraction/repulsion
        if (dist < 250 && dist > 0) {
          const force = (250 - dist) / 250;
          const attractStrength = 0.3;
          node.targetX = node.x + dx * force * attractStrength;
          node.targetY = node.y + dy * force * attractStrength;
        }

        // Smooth movement toward target
        node.x += (node.targetX - node.x) * 0.02;
        node.y += (node.targetY - node.y) * 0.02;

        // Gentle oscillation
        const oscillation = Math.sin(time + node.pulseOffset) * 3;
        node.x += Math.sin(time * 0.5 + node.pulseOffset) * 0.3;
        node.y += Math.cos(time * 0.4 + node.pulseOffset) * 0.3;

        // Calculate visual properties
        const distFromMouse = Math.sqrt(
          Math.pow(mouse.x - node.x, 2) + Math.pow(mouse.y - node.y, 2)
        );
        const mouseBrightness = Math.max(0, 1 - distFromMouse / 300);
        const pulse = (Math.sin(time * 2 + node.pulseOffset) + 1) / 2;

        // Node glow
        const glowSize = 25 + pulse * 10 + mouseBrightness * 20;
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        
        const layerHue = node.layer === 0 ? 187 : node.layer === 1 ? 230 : 270;
        const glowOpacity = 0.2 + pulse * 0.15 + mouseBrightness * 0.4;
        
        glowGradient.addColorStop(0, `hsla(${layerHue}, 100%, 60%, ${glowOpacity})`);
        glowGradient.addColorStop(0.4, `hsla(${layerHue}, 80%, 50%, ${glowOpacity * 0.5})`);
        glowGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node core
        const coreSize = 2.5 + pulse * 1 + mouseBrightness * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, coreSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${layerHue}, 100%, ${70 + mouseBrightness * 25}%, ${0.7 + pulse * 0.2 + mouseBrightness * 0.3})`;
        ctx.fill();

        // Bright center point
        ctx.beginPath();
        ctx.arc(node.x, node.y, coreSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${layerHue}, 100%, 90%, ${0.8 + mouseBrightness * 0.2})`;
        ctx.fill();
      });

      // Draw cursor interaction glow
      const cursorGradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 180
      );
      cursorGradient.addColorStop(0, "hsla(187, 100%, 50%, 0.12)");
      cursorGradient.addColorStop(0.5, "hsla(270, 70%, 60%, 0.04)");
      cursorGradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
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

      {/* Cursor-reactive floating orb */}
      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none z-0"
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
        className="fixed top-1/4 left-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, hsl(187 100% 50%) 0%, transparent 70%)" }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, hsl(270 70% 60%) 0%, transparent 70%)" }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};
