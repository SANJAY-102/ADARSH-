import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Player } from './Player'
import { World } from './World'
import { UI } from './UI'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510' }}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <color attach="background" args={['#050510']} />
          <ambientLight intensity={0.2} />
          <directionalLight castShadow position={[10, 20, 10]} intensity={1} shadow-mapSize={[2048, 2048]} color="#b3e0ff" />
          <pointLight position={[-10, 10, -10]} intensity={2} color="#ff00ff" />
          <pointLight position={[10, 10, -10]} intensity={2} color="#00ffff" />
          
          <Physics>
            <World />
            <Player />
          </Physics>

          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </KeyboardControls>
      <UI />
    </div>
  )
}
