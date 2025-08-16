import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let mounted = true;

    const initThreeJS = async () => {
      try {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');

        if (!mounted || !mountRef.current) return;

        console.log('Initializing starfield...');

        // Clear any previous content
        mountRef.current.innerHTML = '';

        // Scene setup - exact match
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x160016);
        
        // Camera setup - exact match
        let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 4, 21);
        
        // Renderer setup - exact match
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        
        // Resize handler - exact match
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Enhanced mouse tracking for more responsive interactivity
        const handleMouseMove = (event) => {
          mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // More responsive camera movement
          targetRotationRef.current.x = mouseRef.current.y * 0.3;
          targetRotationRef.current.y = mouseRef.current.x * 0.3;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        // Controls setup - exact match
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;

        // Time uniform - exact match
        let gu = {
          time: {value: 0}
        };

        // Particle data arrays - exact match
        let sizes = [];
        let shift = [];
        let pushShift = () => {
          shift.push(
            Math.random() * Math.PI, 
            Math.random() * Math.PI * 2, 
            (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
            Math.random() * 0.9 + 0.1
          );
        };

        // Create points - exact match
        let pts = new Array(50000).fill().map(p => {
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
          return new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 0.5 + 9.5);
        });

        // Add galaxy points - exact match
        for(let i = 0; i < 100000; i++){
          let r = 10, R = 40;
          let rand = Math.pow(Math.random(), 1.5);
          let radius = Math.sqrt(R * R * rand + (1 - rand) * r * r);
          pts.push(new THREE.Vector3().setFromCylindricalCoords(radius, Math.random() * 2 * Math.PI, (Math.random() - 0.5) * 2 ));
          sizes.push(Math.random() * 1.5 + 0.5);
          pushShift();
        }

        console.log(`Created ${pts.length} particles`);

        // Create geometry - exact match
        let g = new THREE.BufferGeometry().setFromPoints(pts);
        g.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, 1));
        g.setAttribute("shift", new THREE.Float32BufferAttribute(shift, 4));

        // Create material with exact shader modifications
        let m = new THREE.PointsMaterial({
          size: 0.125,
          transparent: true,
          depthTest: false,
          blending: THREE.AdditiveBlending,
          opacity: 0.25, // Further reduced opacity for subtlety
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
              `vec4 diffuseColor = vec4( diffuse, opacity );`,
              `float d = length(gl_PointCoord.xy - 0.5);
               vec4 diffuseColor = vec4( vColor, smoothstep(0.5, 0.1, d) * 0.6 );`
            );
          }
        });

        // Create points mesh - exact match
        let p = new THREE.Points(g, m);
        p.rotation.order = "ZYX";
        p.rotation.z = 0.2;
        scene.add(p);

        console.log('Points added to scene');

        // Clock for animation - exact match
        let clock = new THREE.Clock();

        // Animation loop - exact match using setAnimationLoop
        renderer.setAnimationLoop(() => {
          if (!mounted) {
            renderer.setAnimationLoop(null);
            return;
          }

          controls.update();
          let t = clock.getElapsedTime() * 0.5;
          gu.time.value = t * Math.PI;

          // Enhanced interactive camera movement based on mouse
          camera.position.x += (targetRotationRef.current.y * 8 - camera.position.x) * 0.05;
          camera.position.y += (4 + targetRotationRef.current.x * 5 - camera.position.y) * 0.05;
          camera.position.z += (21 + targetRotationRef.current.x * 2 - camera.position.z) * 0.02;
          camera.lookAt(0, 0, 0);

          // Enhanced rotation with stronger mouse influence
          p.rotation.y = t * 0.05 + targetRotationRef.current.y * 0.2;
          p.rotation.x = targetRotationRef.current.x * 0.15;
          p.rotation.z = 0.2 + targetRotationRef.current.x * 0.1;

          renderer.render(scene, camera);
        });

        console.log('Animation started');

        // Store cleanup function
        cleanupRef.current = () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("mousemove", handleMouseMove);
          renderer.setAnimationLoop(null);

          if (g) g.dispose();
          if (m) m.dispose();
          if (renderer) {
            renderer.dispose();
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
              mountRef.current.removeChild(renderer.domElement);
            }
          }
          if (controls) controls.dispose();
        };

      } catch (error) {
        console.error('Failed to initialize starfield:', error);
      }
    };

    initThreeJS();

    return () => {
      mounted = false;
      if (cleanupRef.current) {
        cleanupRef.current();
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
