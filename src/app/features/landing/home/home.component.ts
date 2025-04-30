import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule],  
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements AfterViewInit {
  colors = [0x7f5af0, 0x2cb67d, 0x232946, 0x16161a, 0x2d334a, 0xb8c1ec];

  private loader = new THREE.TextureLoader();

  @ViewChild('particlesCanvas', { static: false }) canvasRef!: ElementRef;

  ngAfterViewInit() {
    this.createParticles();
  }

  createParticles() {
    const mouse = {
      x: 0,
      y: 0,
    };
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });    
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const frequencies = new Float32Array(particlesCount);
    const amplitudes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 30;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 30;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color(
        this.colors[Math.floor(Math.random() * this.colors.length)]
      );
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;

      frequencies[i] = Math.random() * 2 + 0.5;
      amplitudes[i] = Math.random() * 0.2 + 0.5;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorArray, 3)
    );

    this.loader.load('imgs/particle.png', (texture) => {
      const material = new THREE.PointsMaterial({
        size: 0.05,
        map: texture,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, material);
      scene.add(particlesMesh);

      camera.position.z = 5;
      let elapsedTime = 0;

      const clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);

        elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x +=
          (mouse.y * 0.1 - particlesMesh.rotation.x) * 0.01;
        particlesMesh.rotation.z +=
          (mouse.x * 0.1 - particlesMesh.rotation.z) * 0.01;

        const scales = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
          scales[i] =
            amplitudes[i] + Math.sin(elapsedTime * frequencies[i]) * 0.05;
        }

        const avgScale = scales.reduce((a, b) => a + b, 0) / particlesCount;
        particlesMesh.scale.set(avgScale, avgScale, avgScale);

        renderer.render(scene, camera);
      };

      animate();
    });
  }
}
