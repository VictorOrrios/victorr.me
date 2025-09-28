declare module 'troika-three-text' {
  import * as THREE from 'three';

  export class Text extends THREE.Mesh {
    text: string;
    font: string;
    fontSize: number;
    color?: number | string;
    material?: THREE.Material;
    position: THREE.Vector3;
    sync(): void;
    anchorX: any;
    anchorY: any;
  }
}
