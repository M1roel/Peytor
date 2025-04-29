import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements AfterViewInit {
  colors = [
    0x7f5af0, // $primary
    0x2cb67d, // $accent
    0x232946, // $secondary
    0x16161a, // $background
    0x2d334a, // $surface
    0xb8c1ec, // $text-secondary
  ];

  private loader = new THREE.TextureLoader();

  @ViewChild('particlesCanvas', { static: false }) canvasRef!: ElementRef;

  ngAfterViewInit() {
    this.createParticles();
  }

  createParticles() {
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

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color(
        this.colors[Math.floor(Math.random() * this.colors.length)]
      );
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
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
        size: 0.03,
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

      const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
      };

      animate();
    });
  }
}
