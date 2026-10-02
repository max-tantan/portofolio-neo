import { useEffect, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import type { Mesh } from 'three'

type ShapeProps = {
  position: [number, number, number]
  rotation?: [number, number, number]
  color: string
  scale?: number
  speed?: number
  children: React.ReactNode
}

function SpinningShape({
  position,
  rotation = [0, 0, 0],
  color,
  scale = 1,
  speed = 0.6,
  children,
}: ShapeProps) {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speed
      mesh.current.rotation.y += delta * speed * 0.8
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.9}
      floatIntensity={1.4}
    >
      <mesh
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow
      >
        {children}
        <meshStandardMaterial color={color} flatShading roughness={0.35} />
      </mesh>
    </Float>
  )
}

type PointerTarget = MutableRefObject<{ x: number; y: number }>

function Rig({ target }: { target: PointerTarget }) {
  useFrame((state, delta) => {
    const camera = state.camera
    const rotY = target.current.x * 0.24
    const rotX = target.current.y * 0.16
    camera.rotation.y += (rotY - camera.rotation.y) * Math.min(delta * 2.6, 1)
    camera.rotation.x += (rotX - camera.rotation.x) * Math.min(delta * 2.6, 1)
  })
  return null
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 6, 6]} intensity={1.6} />
      <directionalLight position={[-6, -4, 3]} intensity={0.7} color="#ffc8dd" />
      <pointLight position={[0, -4, 4]} intensity={0.5} color="#a8e6cf" />

      <SpinningShape position={[0, 0.55, 0]} color="#ffc8dd" speed={0.7}>
        <torusGeometry args={[1.65, 0.42, 18, 48]} />
      </SpinningShape>

      <SpinningShape
        position={[2.6, -1.3, 0.6]}
        color="#a0d2f0"
        rotation={[0.4, 0, 0]}
        scale={0.62}
        speed={1}
      >
        <icosahedronGeometry args={[1, 0]} />
      </SpinningShape>

      <SpinningShape
        position={[-2.7, -0.6, -0.4]}
        color="#ffe08a"
        rotation={[0.2, 0.6, 0]}
        scale={0.72}
        speed={1.1}
      >
        <boxGeometry args={[1, 1, 1]} />
      </SpinningShape>

      <SpinningShape
        position={[-1.8, 1.9, -1]}
        color="#a8e6cf"
        rotation={[0, 0.4, 0]}
        scale={0.5}
        speed={1.3}
      >
        <coneGeometry args={[0.7, 1.4, 4]} />
      </SpinningShape>

      <SpinningShape
        position={[1.6, 2.1, -1.6]}
        color="#c3b1e1"
        rotation={[0.3, 0, 0]}
        scale={0.4}
        speed={1.5}
      >
        <dodecahedronGeometry args={[1, 0]} />
      </SpinningShape>

      <SpinningShape
        position={[-3.1, 1.2, 0.4]}
        color="#ffd8a8"
        rotation={[0.2, 0, 0.4]}
        scale={0.38}
        speed={1.4}
      >
        <torusGeometry args={[1, 0.35, 12, 24]} />
      </SpinningShape>
    </>
  )
}

export function Hero3D() {
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return
    const handle = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1
      target.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handle, { passive: true })
    return () => window.removeEventListener('pointermove', handle)
  }, [reduced])

  return (
    <div
      className="hero-3d"
      role="img"
      aria-label="Floating pastel abstract 3D shapes"
    >
      <Canvas
        frameloop={reduced ? 'demand' : 'always'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        shadows
      >
        <Scene />
        <Rig target={target} />
      </Canvas>
    </div>
  )
}