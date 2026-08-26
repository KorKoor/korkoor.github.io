// model-viewer.js — Visor 3D en vivo (Three.js) para los escaneos de Charly y Lee.
// Sin build step: se importa directamente desde CDN como módulo ES, igual que el resto del sitio.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function makeShadowTexture() {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(62, 39, 35, 0.35)');
    gradient.addColorStop(0.7, 'rgba(62, 39, 35, 0.12)');
    gradient.addColorStop(1, 'rgba(62, 39, 35, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

function frameCamera(camera, controls, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.65;

    const direction = new THREE.Vector3(0.55, 0.25, 1).normalize();
    const position = new THREE.Vector3().copy(center).addScaledVector(direction, distance);

    camera.position.copy(position);
    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    controls.target.copy(center);
    controls.minDistance = distance * 0.35;
    controls.maxDistance = distance * 2.5;
    controls.update();

    return { center, size: maxDim, position: position.clone() };
}

function setupControls(container, controls, camera, defaultView) {
    const bar = container.querySelector('.model3d-controls');
    if (!bar) return;

    const rotateBtn = bar.querySelector('[data-action="rotate"]');
    const resetBtn = bar.querySelector('[data-action="reset"]');
    const fsBtn = bar.querySelector('[data-action="fullscreen"]');

    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            controls.autoRotate = !controls.autoRotate;
            rotateBtn.classList.toggle('is-active', controls.autoRotate);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (!defaultView.position || !defaultView.target) return;
            camera.position.copy(defaultView.position);
            controls.target.copy(defaultView.target);
            controls.update();
        });
    }

    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });
        document.addEventListener('fullscreenchange', () => {
            const isFs = document.fullscreenElement === container;
            container.classList.toggle('is-fullscreen', isFs);
            fsBtn.querySelector('i').className = isFs ? 'fas fa-compress' : 'fas fa-expand';
        });
    }
}

function createViewer(containerId, glbUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const loadingEl = container.querySelector('.model3d-loading');
    const progressBar = container.querySelector('.model3d-progress-bar');
    const loadingText = container.querySelector('.model3d-loading-text b');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.classList.add('model3d-canvas');
    container.appendChild(renderer.domElement);

    // Iluminación cálida, coherente con la paleta café/crema del sitio
    scene.add(new THREE.HemisphereLight(0xfff3e6, 0x3e2723, 1.6));
    const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.2);
    keyLight.position.set(2.5, 3.5, 3);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xd7ccc8, 1.1);
    rimLight.position.set(-3, 1.5, -2);
    scene.add(rimLight);

    // Sombra de contacto suave bajo el modelo
    const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(1, 48),
        new THREE.MeshBasicMaterial({ map: makeShadowTexture(), transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    scene.add(shadow);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.72;

    const defaultView = { position: null, target: null };

    let resumeTimer = null;
    controls.addEventListener('start', () => {
        controls.autoRotate = false;
        container.querySelector('[data-action="rotate"]')?.classList.remove('is-active');
        clearTimeout(resumeTimer);
    });
    controls.addEventListener('end', () => {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
            controls.autoRotate = true;
            container.querySelector('[data-action="rotate"]')?.classList.add('is-active');
        }, 4000);
    });

    setupControls(container, controls, camera, defaultView);

    const loader = new GLTFLoader();
    loader.load(
        glbUrl,
        (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            const { center, size, position } = frameCamera(camera, controls, model);
            shadow.position.set(center.x, center.y - size * 0.42, center.z);
            shadow.scale.setScalar(size * 0.75);

            defaultView.position = position;
            defaultView.target = center.clone();

            if (loadingEl) {
                loadingEl.classList.add('is-done');
                setTimeout(() => loadingEl.remove(), 400);
            }
        },
        (evt) => {
            if (!evt.lengthComputable || !progressBar) return;
            const pct = Math.min(100, Math.round((evt.loaded / evt.total) * 100));
            progressBar.style.width = pct + '%';
            if (loadingText) loadingText.textContent = pct + '%';
        },
        (err) => {
            console.error('Error cargando modelo 3D:', glbUrl, err);
            if (loadingEl) loadingEl.innerHTML = '<span class="model3d-loading-text">No se pudo cargar el modelo 3D.</span>';
        }
    );

    function resize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let running = true;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => { running = entry.isIntersecting; });
    }, { threshold: 0.05 });
    io.observe(container);

    function animate() {
        requestAnimationFrame(animate);
        if (!running) return;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

export function initModel3D() {
    if (!window.WebGLRenderingContext) return;
    createViewer('viewer-charly', 'assets/images/Models/CharlyModel.glb');
    createViewer('viewer-lee', 'assets/images/Models/Lee.glb');
}
