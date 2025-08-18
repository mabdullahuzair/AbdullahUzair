import { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ x: 0, y: 0 });
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    let themeObserver = null;
    let scene = null;
    let shaderRef = null;

    const initThreeJS = async () => {
      try {
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls');

        if (!mounted || !mountRef.current) return;

        console.log('Initializing starfield...');

        // Clear any previous content
        mountRef.current.innerHTML = '';

        // Scene setup with grayish theme support
        scene = new THREE.Scene();
        // Check for dark mode and set appropriate background
        const isDarkMode = document.documentElement.classList.contains('dark');
        scene.background = new THREE.Color(isDarkMode ? 0x1a1a1a : 0xe5e7eb);
        
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

        // 3D Drag controls for interactive background
        const handleMouseDown = (event) => {
          isDraggingRef.current = true;
          dragStartRef.current.x = event.clientX;
          dragStartRef.current.y = event.clientY;
        };

        const handleMouseMove = (event) => {
          if (isDraggingRef.current) {
            const deltaX = event.clientX - dragStartRef.current.x;
            const deltaY = event.clientY - dragStartRef.current.y;

            // Update camera rotation based on drag movement
            cameraRotationRef.current.y += deltaX * 0.005;
            cameraRotationRef.current.x += deltaY * 0.005;

            // Constrain vertical rotation
            cameraRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotationRef.current.x));

            dragStartRef.current.x = event.clientX;
            dragStartRef.current.y = event.clientY;
          }
        };

        const handleMouseUp = () => {
          isDraggingRef.current = false;
        };

        // Add drag event listeners
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        // Touch support for mobile
        const handleTouchStart = (event) => {
          if (event.touches.length === 1) {
            isDraggingRef.current = true;
            dragStartRef.current.x = event.touches[0].clientX;
            dragStartRef.current.y = event.touches[0].clientY;
          }
        };

        const handleTouchMove = (event) => {
          if (isDraggingRef.current && event.touches.length === 1) {
            const deltaX = event.touches[0].clientX - dragStartRef.current.x;
            const deltaY = event.touches[0].clientY - dragStartRef.current.y;

            cameraRotationRef.current.y += deltaX * 0.005;
            cameraRotationRef.current.x += deltaY * 0.005;

            cameraRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cameraRotationRef.current.x));

            dragStartRef.current.x = event.touches[0].clientX;
            dragStartRef.current.y = event.touches[0].clientY;
          }
        };

        const handleTouchEnd = () => {
          isDraggingRef.current = false;
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        // Track mouse position for hover effects
        const handleMouseHover = (event) => {
          if (!isDraggingRef.current) {
            const rect = mountRef.current.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            console.log('Mouse position:', mouseRef.current.x, mouseRef.current.y);
          }
        };

        // Track scroll for background rotation
        const handleScroll = () => {
          scrollOffsetRef.current = window.scrollY * 0.001;
        };

        mountRef.current.addEventListener("mousemove", handleMouseHover, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });

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

        // Shader reference already declared above

        // Create material with hover distortion and theme support
        let m = new THREE.PointsMaterial({
          size: 0.08, // Slightly thicker particles
          transparent: true,
          depthTest: false,
          blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
          opacity: isDarkMode ? 0.12 : 0.6, // Higher opacity for dark particles on light background
          onBeforeCompile: shader => {
            shader.uniforms.time = gu.time;
            shader.uniforms.mouse = { value: new THREE.Vector2() };
            shaderRef = shader; // Store reference for later use
            shader.vertexShader = `
              uniform float time;
              uniform vec2 mouse;
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
                // Theme-aware colors: dark/blackish particles for light theme, light particles for dark theme
                ${isDarkMode ?
                  'vColor = mix(vec3(180., 180., 180.), vec3(120., 120., 200.), d) / 255.;' :
                  'vColor = mix(vec3(5., 5., 5.), vec3(30., 30., 30.), d) / 255.;'
                }
              `
            ).replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
                float t = time;
                float moveT = mod(shift.x + shift.z * t, PI2);
                float moveS = mod(shift.y + shift.z * t, PI2);
                transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;

                // Simple cursor hover distortion effect
                vec2 mousePos = mouse * 15.0;
                float mouseDistance = length(position.xy - mousePos);
                float mouseInfluence = smoothstep(8.0, 0.0, mouseDistance);
                vec2 mouseDirection = normalize(position.xy - mousePos);

                // Particles move away from cursor position
                transformed.xy += mouseDirection * mouseInfluence * 5.0;
              `
            );

            shader.fragmentShader = `
              varying vec3 vColor;
              ${shader.fragmentShader}
            `.replace(
              `vec4 diffuseColor = vec4( diffuse, opacity );`,
              `float d = length(gl_PointCoord.xy - 0.5);
               float alpha = smoothstep(0.5, 0.1, d);
               vec4 diffuseColor = vec4( vColor, alpha * ${isDarkMode ? '0.15' : '0.8'} );`
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

        // Animation loop with 3D drag controls and scroll effects
        renderer.setAnimationLoop(() => {
          if (!mounted) {
            renderer.setAnimationLoop(null);
            return;
          }

          controls.update();
          let t = clock.getElapsedTime() * 0.5;
          gu.time.value = t * Math.PI;

          // Update mouse uniform for hover effects
          if (shaderRef && shaderRef.uniforms.mouse) {
            shaderRef.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
          }

          // Apply 3D camera rotation based on drag + scroll offset
          const radius = 25;
          const scrollRotation = scrollOffsetRef.current;
          camera.position.x = Math.sin(cameraRotationRef.current.y + scrollRotation) * Math.cos(cameraRotationRef.current.x) * radius;
          camera.position.y = Math.sin(cameraRotationRef.current.x) * radius;
          camera.position.z = Math.cos(cameraRotationRef.current.y + scrollRotation) * Math.cos(cameraRotationRef.current.x) * radius;
          camera.lookAt(0, 0, 0);

          // Subtle automatic rotation when not dragging + scroll influence
          if (!isDraggingRef.current) {
            p.rotation.y = t * 0.02 + scrollRotation * 0.5;
            p.rotation.x = scrollRotation * 0.2;
          }

          renderer.render(scene, camera);
        });

        console.log('Animation started');

        // Add theme observer for dynamic updates
        const updateTheme = () => {
          const newIsDarkMode = document.documentElement.classList.contains('dark');
          if (scene) {
            scene.background = new THREE.Color(newIsDarkMode ? 0x1a1a1a : 0xe5e7eb);
          }

          // Recreate material with new theme colors
          if (p && g) {
            // Remove old material
            p.material.dispose();

            // Create new material with updated theme
            const newMaterial = new THREE.PointsMaterial({
              size: 0.08,
              transparent: true,
              depthTest: false,
              blending: newIsDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
              opacity: newIsDarkMode ? 0.12 : 0.6,
              onBeforeCompile: shader => {
                shader.uniforms.time = gu.time;
                shader.uniforms.mouse = { value: new THREE.Vector2() };
                shaderRef = shader;
                shader.vertexShader = `
                  uniform float time;
                  uniform vec2 mouse;
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
                    // Theme-aware colors: dark/blackish particles for light theme, light particles for dark theme
                    ${newIsDarkMode ?
                      'vColor = mix(vec3(180., 180., 180.), vec3(120., 120., 200.), d) / 255.;' :
                      'vColor = mix(vec3(5., 5., 5.), vec3(30., 30., 30.), d) / 255.;'
                    }
                  `
                ).replace(
                  `#include <begin_vertex>`,
                  `#include <begin_vertex>
                    float t = time;
                    float moveT = mod(shift.x + shift.z * t, PI2);
                    float moveS = mod(shift.y + shift.z * t, PI2);
                    transformed += vec3(cos(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;

                    // Simple cursor hover distortion effect
                    vec2 mousePos = mouse * 15.0;
                    float mouseDistance = length(position.xy - mousePos);
                    float mouseInfluence = smoothstep(8.0, 0.0, mouseDistance);
                    vec2 mouseDirection = normalize(position.xy - mousePos);

                    // Particles move away from cursor position
                    transformed.xy += mouseDirection * mouseInfluence * 5.0;
                  `
                );

                shader.fragmentShader = `
                  varying vec3 vColor;
                  ${shader.fragmentShader}
                `.replace(
                  `vec4 diffuseColor = vec4( diffuse, opacity );`,
                  `float d = length(gl_PointCoord.xy - 0.5);
                   float alpha = smoothstep(0.5, 0.1, d);
                   vec4 diffuseColor = vec4( vColor, alpha * ${newIsDarkMode ? '0.15' : '0.8'} );`
                );
              }
            });

            // Update the points mesh with new material
            p.material = newMaterial;
            m = newMaterial; // Update reference
          }
        };

        // Create a MutationObserver to watch for theme changes
        themeObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              updateTheme();
            }
          });
        });

        // Start observing the document element for class changes
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        });

        // Store cleanup function
        cleanupRef.current = () => {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchEnd);
          window.removeEventListener("scroll", handleScroll);
          if (mountRef.current) {
            mountRef.current.removeEventListener("mousemove", handleMouseHover);
          }
          if (themeObserver) {
            themeObserver.disconnect();
          }
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
      className="fixed inset-0 z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        pointerEvents: 'auto' // Enable pointer events for hover
      }}
    />
  );
};

export default StarfieldBackground;
