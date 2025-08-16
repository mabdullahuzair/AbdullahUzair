import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);
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

        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x160016); // Exact color from provided code
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 4, 21);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

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

        // Create points for inner sphere
        const pts = new Array(30000).fill().map(() => {
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
          return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
        });

        // Create points for outer galaxy
        for (let i = 0; i < 70000; i++) {
          const r = 10;
          const R = 40;
          const rand = Math.pow(Math.random(), 1.5);
          const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
          pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2));
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
        }

        // Create geometry
        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        geometry.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
        geometry.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));

        // Create material with custom shaders matching site colors
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
                // Use site's color scheme: purple to blue to cyan
                vColor = mix(vec3(147., 51., 234.), vec3(59., 130., 246.), d) / 255.; // purple-600 to blue-500
                vColor = mix(vColor, vec3(6., 182., 212.) / 255., d * 0.5); // blend with cyan-500
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
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default StarfieldBackground;
