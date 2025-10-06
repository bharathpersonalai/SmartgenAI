import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

// Define the props for our component
type IntroAnimationProps = {
  onAnimationComplete: () => void;
};

// --- OGL Particle Shader Code (included directly for simplicity) ---
const vertex = /* glsl */ `
  attribute vec3 position;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uSpread;
  uniform float uBaseSize;
  void main() {
    vec3 pos = position * uSpread;
    vec4 mvPos = viewMatrix * vec4(pos, 1.0);
    gl_PointSize = uBaseSize / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uAlpha;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.4, d);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * uAlpha);
  }
`;
// --- End of Shader Code ---


const IntroAnimation: React.FC<IntroAnimationProps> = ({ onAnimationComplete }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showGlow, setShowGlow] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoToNavbar, setLogoToNavbar] = useState(false);

  // This useEffect handles the particle explosion animation
  useEffect(() => {
    if (!showParticles) return;

    const container = canvasRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: 2, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, 20);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener('resize', resize, false);
    resize();

    // Increased particle count from 2000 to 5000
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uSpread: { value: 0 },
        uBaseSize: { value: 200 },
        uAlpha: { value: 0 }
      },
      transparent: true,
      depthTest: false
    });
    
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId: number;
    let startTime: number | null = null;

    const update = (t: number) => {
      if (startTime === null) startTime = t;
      animationFrameId = requestAnimationFrame(update);
      const elapsed = t - startTime;
      const progress = Math.min(elapsed / 2000, 1);
      
      program.uniforms.uSpread.value = progress * 25;
      program.uniforms.uAlpha.value = 1.0 - Math.pow(progress, 4);
      if (progress === 1) program.uniforms.uBaseSize.value = 0;

      renderer.render({ scene: particles, camera });
    };

    // Start the animation immediately when particles are triggered
    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (container && gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [showParticles]);

  // Handle the sequence: glow -> blast to particles -> logo appears -> logo moves to navbar
  useEffect(() => {
    // Step 1: Hide glow and trigger particle blast after 1.5 seconds
    const glowTimer = setTimeout(() => {
      setShowGlow(false);
      setShowParticles(true);
    }, 1500);

    // Step 2: Show logo after particles start (after 2 seconds total)
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    // Step 3: Move logo to navbar after it appears (after 3.5 seconds total)
    const moveTimer = setTimeout(() => {
      setLogoToNavbar(true);
    }, 3500);

    // Step 4: Complete animation after logo reaches navbar (after 5 seconds total)
    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 5000);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(logoTimer);
      clearTimeout(moveTimer);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {/* Canvas for the particle explosion */}
        <div ref={canvasRef} className="absolute inset-0" />

        {/* Glowing Light Animation */}
        <AnimatePresence>
          {showGlow && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 2,
                transition: { duration: 0.3 } 
              }} 
            >
              {/* Main glowing light - no orb, just pure glow */}
              <motion.div
                className="relative w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0) 70%)',
                  boxShadow: `
                    0 0 80px 40px rgba(255, 255, 255, 0.8),
                    0 0 150px 80px rgba(255, 255, 255, 0.6),
                    0 0 220px 120px rgba(255, 255, 255, 0.4),
                    0 0 300px 160px rgba(255, 255, 255, 0.2)
                  `,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.6, 1],
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    boxShadow: `
                      0 0 80px 40px rgba(255, 255, 255, 0.8),
                      0 0 150px 80px rgba(255, 255, 255, 0.6),
                      0 0 220px 120px rgba(255, 255, 255, 0.4)
                    `,
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The circular AI logo - appears after blast and moves to navbar position */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="fixed z-[100]"
            initial={{ 
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 0,
              opacity: 0
            }}
            animate={logoToNavbar ? {
              // Move to navbar AI logo position (left side of navbar)
              // Using media query approach for desktop positioning
              top: '1.75rem',
              left: '50%',
              x: '-310px', // Moves left from center - adjust this value to match your navbar width
              y: '-4.5%',
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            } : {
              // Stay at center initially
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: 'easeOut'
              }
            }}
          >
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <img 
                src="/images/AI.png" 
                alt="SmartgenAI Logo" 
                className="h-8 w-8 rounded-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntroAnimation;