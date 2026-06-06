import { RigidBody } from '@react-three/rapier'
import { Text, Image as DreiImage, Grid, Html } from '@react-three/drei'
import { useStore } from './store'
import assets from './assets.json'

function GalleryZone({ position, title, subtitle, images, color }: any) {
  return (
    <group position={position}>
      {/* Title */}
      <Text position={[0, 8, 0]} fontSize={2} color="white" outlineWidth={0.1} outlineColor="black" anchorY="bottom">
        {title}
      </Text>
      <Text position={[0, 6.5, 0]} fontSize={0.8} color="yellow" outlineWidth={0.05} outlineColor="black" anchorY="bottom">
        {subtitle}
      </Text>
      
      {/* Platform */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.4, 0]} receiveShadow>
          <cylinderGeometry args={[15, 15, 0.5, 32]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} emissive={color} emissiveIntensity={0.1} />
        </mesh>
      </RigidBody>

      {/* Images arranged in a circle */}
      {images && images.map((imgUrl: string, i: number) => {
        const angle = (i / images.length) * Math.PI * 2
        const radius = 10
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        // The image should face the center
        const rotationY = -angle + Math.PI / 2

        return (
          <group key={i} position={[x, 2, z]} rotation={[0, rotationY, 0]}>
            <RigidBody type="fixed" colliders="cuboid">
              <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
                <boxGeometry args={[5.2, 3.2, 0.2]} />
                <meshStandardMaterial color="#222" metalness={0.8} />
              </mesh>
            </RigidBody>
            {imgUrl.toLowerCase().endsWith('.mp4') ? (
               <Html transform position={[0, 0, 0.02]} scale={0.4} distanceFactor={8}>
                 <div style={{ width: '400px', height: '240px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '2px solid #00ffcc', pointerEvents: 'auto' }}>
                   <video src={imgUrl} autoPlay loop muted playsInline controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                 </div>
               </Html>
            ) : (
               <Html transform position={[0, 0, 0.02]} scale={0.4} distanceFactor={8}>
                 <div style={{ width: '400px', height: '240px', background: '#000', borderRadius: '8px', overflow: 'hidden', border: '2px solid #00ffcc', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <img src={imgUrl} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                 </div>
               </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

function FatherZone({ position, images }: any) {
  const takeDamage = useStore((state) => state.takeDamage)
  
  return (
    <group position={position}>
      <Text position={[0, 10, 0]} fontSize={2} color="red" outlineWidth={0.1} outlineColor="black" anchorY="bottom">
        Father Zone
      </Text>
      <Text position={[0, 8.5, 0]} fontSize={1} color="white" outlineWidth={0.05} outlineColor="black" anchorY="bottom">
        "Son, please stop talking for 5 minutes."
      </Text>
      
      {/* Damage Area */}
      <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={() => takeDamage()} onCollisionExit={() => takeDamage()}>
         <mesh position={[0, 0, 0]} visible={false}>
            <boxGeometry args={[20, 10, 20]} />
            <meshBasicMaterial color="red" wireframe />
         </mesh>
      </RigidBody>

      <GalleryZone position={[0,0,0]} title="" subtitle="" images={images} color="#8b0000" />
    </group>
  )
}

function FoodItem({ position }: any) {
  const boostSpeed = useStore((state) => state.boostSpeed)
  return (
    <RigidBody type="fixed" colliders="cuboid" onCollisionEnter={() => boostSpeed()}>
      <mesh position={position} castShadow>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color="#ffcc00" emissive="#ffaa00" emissiveIntensity={1} />
      </mesh>
    </RigidBody>
  )
}

export function World() {
  return (
    <group>
      {/* Solid Dark Floor with Grid Texture/Pattern effect */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -0.5, 0]}>
        <mesh receiveShadow>
           <boxGeometry args={[1000, 1, 1000]} />
           <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>
      
      {/* Decorative Grid above the solid floor */}
      <Grid position={[0, 0.01, 0]} args={[1000, 1000]} cellSize={2} cellThickness={1} cellColor="#00ffcc" sectionSize={10} sectionThickness={1.5} sectionColor="#ff00ff" fadeDistance={200} fadeStrength={1} />

      {/* ZONES */}
      <GalleryZone position={[0, 0, -40]} title="Home Town" subtitle="Scored less than Sanjay (who still has arrears in college)" images={(assets as any)['achievements']} color="#003366" />
      
      <FatherZone position={[-50, 0, -40]} images={(assets as any)['FATHER']} />
      
      <GalleryZone position={[50, 0, -40]} title="Brother Kingdom" subtitle="Akash AKA Chikku - Throws random family secrets" images={(assets as any)['Brother']} color="#4b0082" />

      <GalleryZone position={[0, 0, -90]} title="Friends Zone" subtitle="The Three Best So-Called Friends (Vrindha, Anda, Nabeela)" images={(assets as any)['FRIENDS']} color="#ff1493" />
      
      <GalleryZone position={[-50, 0, -90]} title="Role Model" subtitle="Inspiring but mostly talking" images={(assets as any)['ROLE MODEL']} color="#b8860b" />

      <GalleryZone position={[50, 0, -90]} title="Expressions" subtitle="Professional Lamentation" images={(assets as any)['EXpressions']} color="#006400" />

      <GalleryZone position={[0, 0, -140]} title="Gallery" subtitle="Surviving Engineering Without Nabeela" images={(assets as any)['gallery']} color="#2f4f4f" />

      <GalleryZone position={[-50, 0, -140]} title="First Love" subtitle="A chapter of memory" images={(assets as any)['first love']} color="#d87093" />

      <GalleryZone position={[50, 0, -140]} title="Second Love" subtitle="Wait, there's a second one?!" images={(assets as any)['SEcond LOve']} color="#ff4500" />

      <GalleryZone position={[0, 0, -190]} title="Soothu Adi" subtitle="Adarsh Pondatti Da Nan" images={(assets as any)['soothu adi']} color="#9400d3" />

      <GalleryZone position={[0, 0, -20]} title="Intro Cinema" subtitle="Welcome to the World of Adarsh" images={(assets as any)['BACKGROUND VIDEO AT START']} color="#00ffcc" />

      {/* Food City */}
      <group position={[0, 0, 30]}>
        <Text position={[0, 8, 0]} fontSize={3} color="#ff9900" outlineWidth={0.1} outlineColor="black" anchorY="bottom">
            Food Addiction City
        </Text>
        <Text position={[0, 5, 0]} fontSize={1} color="white" outlineWidth={0.1} outlineColor="black" anchorY="bottom">
            Giant burgers, biriyani mountains
        </Text>
        
        {/* Scatter food everywhere */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FoodItem key={i} position={[(Math.random() - 0.5) * 40, 0.5, (Math.random() - 0.5) * 40]} />
        ))}
      </group>
    </group>
  )
}
