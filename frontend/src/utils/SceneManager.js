import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.init();
  }

  init() {
    this.scene.background = new THREE.Color(0xe2e8f0); // Light blue-gray (Slate 200)
    this.scene.fog = new THREE.FogExp2(0xe2e8f0, 0.001);

    const aspect = this.canvas.clientWidth / this.canvas.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
    this.camera.position.set(150, 100, 150);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    const width = this.canvas.clientWidth || window.innerWidth * 0.7;
    const height = this.canvas.clientHeight || window.innerHeight * 0.7;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    
    this.addLights();
    this.addBaseGrid();
    this.addRiver();
    
    this.pollutionGroup = new THREE.Group();
    this.scene.add(this.pollutionGroup);
    
    this.buildingGroup = new THREE.Group();
    this.scene.add(this.buildingGroup);
    this.generateCity(12);

    // Resize observer for reliability
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.canvas);

    this.animate();
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 200, 100);
    this.scene.add(directionalLight);
  }

  addBaseGrid() {
    const grid = new THREE.GridHelper(400, 100, 0x94a3b8, 0xcbd5e1); // Slate 400 and 300
    this.scene.add(grid);
  }

  addRiver() {
    const geometry = new THREE.PlaneGeometry(200, 40);
    this.riverMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0ea5e9, // Sky 500
      transparent: true, 
      opacity: 0.8,
      shininess: 100
    });
    const river = new THREE.Mesh(geometry, this.riverMaterial);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.1, 80);
    this.scene.add(river);
  }

  generateCity(factoryCount) {
    while(this.buildingGroup.children.length > 0) {
      this.buildingGroup.remove(this.buildingGroup.children[0]);
    }

    const buildingMat = new THREE.MeshPhongMaterial({ color: 0x334155, flatShading: true }); // Slate 700
    const factoryMat = new THREE.MeshPhongMaterial({ color: 0x1e293b, emissive: 0xf43f5e, emissiveIntensity: 0.1 }); // Slate 800, Rose 500 emissive

    for (let i = 0; i < 80; i++) {
        const h = Math.random() * 30 + 10;
        const geo = new THREE.BoxGeometry(6, h, 6);
        const mesh = new THREE.Mesh(geo, buildingMat);
        mesh.position.set(Math.random() * 200 - 100, h/2, Math.random() * 140 - 70);
        this.buildingGroup.add(mesh);
    }

    this.chimneys = [];
    for (let i = 0; i < factoryCount; i++) {
        const h = 15;
        const geo = new THREE.BoxGeometry(12, h, 12);
        const mesh = new THREE.Mesh(geo, factoryMat);
        mesh.position.set(Math.random() * 180 - 90, h/2, Math.random() * 100 - 50);
        this.buildingGroup.add(mesh);

        const chimneyGeo = new THREE.CylinderGeometry(2, 2, 20, 8);
        const chimney = new THREE.Mesh(chimneyGeo, buildingMat);
        chimney.position.set(mesh.position.x, 20/2 + 5, mesh.position.z);
        this.buildingGroup.add(chimney);
        this.chimneys.push(chimney);
    }
  }

  updatePollution(density) {
     this.scene.fog.density = density / 2000 + 0.002;
     
     // Update river color based on pollution
     if (this.riverMaterial) {
        const r = 0.05 + (density / 100) * 0.4;
        const g = 0.65 - (density / 100) * 0.2;
        const b = 0.93 - (density / 100) * 0.5;
        this.riverMaterial.color.setRGB(r, g, b);
     }

     if (this.pollutionGroup.children.length < density * 10) {
        const chimney = this.chimneys[Math.floor(Math.random() * this.chimneys.length)];
        if (chimney) {
            const geo = new THREE.SphereGeometry(Math.random() * 3 + 1, 8, 8);
            const mat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.15 }); // Slate 400
            const p = new THREE.Mesh(geo, mat);
            p.position.set(chimney.position.x, 25, chimney.position.z);
            p.userData = { 
                vx: (Math.random() - 0.5) * 0.1, 
                vy: Math.random() * 0.1 + 0.05,
                vz: (Math.random() - 0.5) * 0.1,
                life: 1.0 
            };
            this.pollutionGroup.add(p);
        }
     }
  }

  updateTraffic(density) {
    if (!this.trafficGroup) {
      this.trafficGroup = new THREE.Group();
      this.scene.add(this.trafficGroup);
    }
    
    const carGeo = new THREE.BoxGeometry(3, 1.5, 1.5);
    const carMat = new THREE.MeshPhongMaterial({ color: 0x00f2ff });

    while (this.trafficGroup.children.length < density) {
      const car = new THREE.Mesh(carGeo, carMat);
      car.position.set(Math.random() * 200 - 100, 0.75, Math.random() * 200 - 100);
      car.velocity = (Math.random() + 0.5) * 0.3;
      this.trafficGroup.add(car);
    }
    while (this.trafficGroup.children.length > density) {
      this.trafficGroup.remove(this.trafficGroup.children[0]);
    }
  }

  updateWind(speed) {
    this.windSpeed = speed / 100;
  }

  animate() {
    if (!this.renderer) return;
    requestAnimationFrame(() => this.animate());
    
    this.controls.update();

    if (this.testCube) {
      this.testCube.rotation.y += 0.01;
    }

    const windEffect = this.windSpeed || 0.15;

    this.pollutionGroup.children.forEach((p, idx) => {
        p.position.x += p.userData.vx + windEffect;
        p.position.y += p.userData.vy;
        p.position.z += p.userData.vz;
        p.scale.multiplyScalar(1.005);
        p.material.opacity *= 0.995;
        p.userData.life -= 0.005;

        if (p.userData.life <= 0) {
            this.pollutionGroup.remove(p);
        }
    });

    if (this.trafficGroup) {
      this.trafficGroup.children.forEach(car => {
        car.position.x += car.velocity;
        if (car.position.x > 100) car.position.x = -100;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}

export default SceneManager;
