import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const initThreeJS = async () => {
      try {
        // Import Three.js dynamically
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');

        if (!mounted || !mountRef.current) return;

        console.log('Initializing Three.js starfield...');

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x160016); // Dark purple background
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 4, 21);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;
        
        // Append renderer to mount point
        mountRef.current.appendChild(renderer.domElement);

        // Controls setup
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;

        // Uniform for time
        const gu = {
          time: { value: 0 }
        };

        // Create particle data
        const sizes = [];
        const shift = [];
        const pushShift = () => {
          shift.push(
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2,
            (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
            Math.random() * 0.9 + 0.1
          );
        };

        // Create points for inner sphere (exact match)
        const pts = new Array(50000).fill().map(() => {
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
          return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
        });

        // Create points for outer galaxy (exact match)
        for (let i = 0; i < 100000; i++) {
          const r = 10;
          const R = 40;
          const rand = Math.pow(Math.random(), 1.5);
          const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
          pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2));
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
        }

        console.log(`Created ${pts.length} particles`);

        // Create geometry
        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        geometry.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
        geometry.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));

        // Create material with custom shaders
        const material = new THREE.PointsMaterial({
          size: 0.125,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          onBeforeCompile: shader => {
            shader.uniforms.time = gu.time;
            shader.vertexShader = `
              uniform float time;
              attribute float sizes;
              attribute vec4 shift;
              varying vec3 vColor;
              ${shader.vertexShader}
            `.replace(
              `gl_PointSize = size;`,
              `gl_PointSize = size * sizes;`
            ).replace(
              `#include <color_vertex>`,
              `#include <color_vertex>
                float d = length(abs(position) / vec3(40., 10., 40));
                d = clamp(d, 0., 1.);
                vColor = mix(vec3(227., 155., 0.), vec3(100., 50., 255.), d) / 255.;
              `
            ).replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
                float t = time;
                float moveT = mod(shift.x + shift.z * t, PI2);
                float moveS = mod(shift.y + shift.z * t, PI2);
                transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;
              `
            );

            shader.fragmentShader = `
              varying vec3 vColor;
              ${shader.fragmentShader}
            `.replace(
              `#include <clipping_planes_fragment>`,
              `#include <clipping_planes_fragment>
                float d = length(gl_PointCoord.xy - 0.5);
              `
            ).replace(
              `vec4 diffuseColor = vec4( diffuse, opacity );`,
              `vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d) );`
            );
          }
        });

        // Create points mesh
        const points = new THREE.Points(geometry, material);
        points.rotation.order = "ZYX";
        points.rotation.z = 0.2;
        scene.add(points);

        console.log('Starfield added to scene');

        // Clock for animation
        const clock = new THREE.Clock();

        // Resize handler
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
          if (!mounted) return;

          animationRef.current = requestAnimationFrame(animate);
          controls.update();
          const t = clock.getElapsedTime() * 0.5;
          gu.time.value = t * Math.PI;
          points.rotation.y = t * 0.05;
          renderer.render(scene, camera);
        };

        animate();
        console.log('Animation started');

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          controls.dispose();
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
        };

      } catch (error) {
        console.error('Failed to load Three.js:', error);
      }
    };

    const cleanup = initThreeJS();

    return () => {
      mounted = false;
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default StarfieldBackground;
