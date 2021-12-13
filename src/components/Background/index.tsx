import { Stack } from '@chakra-ui/react'
import { useEffect, useRef, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import planet from '../../assets/image/plant.jpg'
import track from '../../assets/image/track.png'

const Background = () => {
  const Planet = (props: JSX.IntrinsicElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!)
    const texture = useTexture(planet)

    return (
      <mesh {...props} ref={ref}>
        <sphereBufferGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial attach={'material'} map={texture} />
      </mesh>
    )
  }

  const Track = () => {
    const ref = useRef<THREE.Mesh>(null!)
    const texture = useTexture(track)

    return (
      <mesh castShadow ref={ref}>
        <ringBufferGeometry args={[2.8, 5.5, 32]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    )
  }

  const PlanetAndTrack = (props: JSX.IntrinsicElements['mesh']) => {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame(() => {
      ref.current.rotateZ(-0.001) // speed
    })

    return (
      <mesh {...props} ref={ref}>
        <Track />
        <Planet rotation={[Math.PI / 2, 0, 0]} />
      </mesh>
    )
  }

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <Stack bg={'black'} w={'full'} h={'full'} pos={'fixed'} zIndex={'-1'} top={0} left={0} overflow={'hidden'}>
      <Canvas>
        <ambientLight intensity={0.01} />
        <directionalLight color="white" position={[800, 360, 30]} intensity={1.5} />
        <directionalLight color="white" position={[20, 20, 20]} intensity={0.12} castShadow />
        <Suspense fallback={null}>
          <PlanetAndTrack rotation={[-0.7, -0.35, 0]} position={width > height ? [-1, -0.5, 1.4] : [-1.5, -1, 0]} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </Stack>
  )
}

export default Background
