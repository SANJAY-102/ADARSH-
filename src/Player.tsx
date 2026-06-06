import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'
import { useStore } from './store'

const SPEED = 10

export function Player() {
  const body = useRef<RapierRigidBody>(null)
  const [, getKeys] = useKeyboardControls()
  const speedMultiplier = useStore((state) => state.speedMultiplier)
  const incrementPodcast = useStore((state) => state.incrementPodcast)
  const isPodcastRunning = useStore((state) => state.isPodcastRunning)

  const heading = useRef(0)
  const speed = useRef(0)

  const gameStarted = useStore((state) => state.gameStarted)

  useFrame((state, delta) => {
    if (!gameStarted) return
    if (!body.current) return
    const { forward, backward, left, right } = getKeys()
    
    const velocity = body.current.linvel()
    
    // 1. Steering logic (realistic car steering)
    const TURN_SPEED = 2.4
    // Reverse steering direction when backing up
    const directionSign = speed.current >= 0 ? 1 : -1
    // Scale turn rate by speed (steerFactor between 0.15 and 1.35)
    const steerFactor = Math.min(1.2, Math.abs(speed.current) / 4) + 0.15
    const currentTurnSpeed = TURN_SPEED * steerFactor * directionSign

    if (left) {
      heading.current += currentTurnSpeed * delta
    }
    if (right) {
      heading.current -= currentTurnSpeed * delta
    }
    
    const newQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, heading.current, 0))
    body.current.setRotation(newQuat, true)

    // 2. Acceleration / Deceleration
    const MAX_SPEED = SPEED * speedMultiplier
    const ACCELERATION = speedMultiplier > 1 ? 60 : 25
    const DECELERATION = 15

    let targetSpeed = 0
    if (forward) {
      targetSpeed = MAX_SPEED
    } else if (backward) {
      targetSpeed = -MAX_SPEED * 0.5
    }

    if (targetSpeed !== 0) {
      if (speed.current < targetSpeed) {
        speed.current = Math.min(targetSpeed, speed.current + ACCELERATION * delta)
      } else {
        speed.current = Math.max(targetSpeed, speed.current - ACCELERATION * delta)
      }
    } else {
      if (speed.current > 0) {
        speed.current = Math.max(0, speed.current - DECELERATION * delta)
      } else if (speed.current < 0) {
        speed.current = Math.min(0, speed.current + DECELERATION * delta)
      }
    }

    // 3. Apply Velocity relative to heading
    const forwardDir = new THREE.Vector3(0, 0, -1).applyQuaternion(newQuat)
    const moveVelocity = forwardDir.multiplyScalar(speed.current)

    body.current.setLinvel({ x: moveVelocity.x, y: velocity.y, z: moveVelocity.z }, true)

    // 4. Sync speed to store for UI speedometer
    useStore.getState().setCurrentSpeed(speed.current)

    // Camera follow (trailing behind the vehicle's heading)
    const translation = body.current.translation()
    const localOffset = new THREE.Vector3(0, 5, 12)
    const worldOffset = localOffset.applyQuaternion(newQuat)
    
    const targetCameraPosition = new THREE.Vector3(
      translation.x + worldOffset.x,
      translation.y + worldOffset.y,
      translation.z + worldOffset.z
    )
    
    state.camera.position.lerp(targetCameraPosition, 0.05)
    state.camera.lookAt(translation.x, translation.y + 1, translation.z)

    if (isPodcastRunning) {
        incrementPodcast()
    }
  })

  return (
    <RigidBody ref={body} colliders="cuboid" lockRotations position={[0, 2, 0]} mass={1}>
      <group onClick={() => useStore.getState().startPodcast()}>
        {/* Chassis */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#ff1e56" emissive="#330011" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Cabin */}
        <mesh castShadow position={[0, 0.5, -0.2]}>
          <boxGeometry args={[1.2, 0.5, 1.2]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Wheels */}
        {[-0.8, 0.8].map((x) => 
          [-1, 1].map((z) => (
            <mesh key={`${x}-${z}`} castShadow position={[x, -0.3, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          ))
        )}
        {/* Thrusters / Exhaust glowing */}
        <mesh position={[0, -0.1, 1.3]}>
          <boxGeometry args={[0.8, 0.2, 0.1]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>
    </RigidBody>
  )
}
