import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function Shape() {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.5
      mesh.current.rotation.y += delta * 0.42
      mesh.current.position.y = Math.sin(performance.now() * 0.001) * 0.08
    }
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.32, 128, 24]} />
      <meshStandardMaterial color="#ffc8dd" flatShading roughness={0.35} />
    </mesh>
  )
}

export function Sidebar3D() {
  const reduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <div
      className="sidebar-3d"
      role="img"
      aria-label="Rotating pastel 3D torus knot"
    >
      <Canvas
        frameloop={reduced ? 'demand' : 'always'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#c3b1e1" />
        <Shape />
      </Canvas>
    </div>
  )
}