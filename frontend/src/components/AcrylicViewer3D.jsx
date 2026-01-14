import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, Center, Stats } from '@react-three/drei';
import * as THREE from 'three';

function AcrylicModel({ width, height, depth, baseType, stepsCount = 3 }) {
    // Convert cm to meters
    const w = width / 100;
    const h = height / 100;
    const d = depth / 100;
    const thickness = 0.003; // 3mm standard for small cases
    const baseHeight = 0.02; // 2cm black base

    // Steps configuration
    // Steps usually take up about 60-70% of the height and depth
    const maxStepHeight = h * 0.7;
    const maxStepDepth = d * 0.8;

    // Calculate individual step dimensions
    const singleStepHeight = maxStepHeight / stepsCount;
    const singleStepDepth = maxStepDepth / stepsCount;

    return (
        <group dispose={null}>
            {/* 1. The Black Base */}
            <mesh position={[0, -h / 2 - baseHeight / 2, 0]} receiveShadow>
                <boxGeometry args={[w + 0.02, baseHeight, d + 0.02]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* 2. Optional: Stepped Display (Gradas) */}
            {baseType === 'stepped' && (
                <group position={[0, -h / 2, 0]}>
                    {Array.from({ length: stepsCount }).map((_, i) => {
                        // "Rellena" (Solid) Logic:
                        // Each step is a solid block
                        // Width: Full internal width
                        // Height: (i+1) * singleStepHeight
                        // Depth: singleStepDepth
                        // Position Z: Arranged from back to front

                        const blockHeight = (i + 1) * singleStepHeight;
                        const zPos = -d / 2 + singleStepDepth / 2 + (i * singleStepDepth) + 0.02; // Start from back + offset

                        return (
                            <mesh
                                key={i}
                                position={[
                                    0,
                                    blockHeight / 2, // Sit on floor (local y=0 is floor of box inside)
                                    zPos
                                ]}
                                castShadow
                                receiveShadow
                            >
                                <boxGeometry args={[w - 0.01, blockHeight, singleStepDepth]} />
                                <meshStandardMaterial
                                    color="#111"
                                    roughness={0.5}
                                    metalness={0.2}
                                />
                            </mesh>
                        );
                    })}
                </group>
            )}

            {/* 3. The Acrylic Box (Cover) */}
            <group position={[0, 0, 0]}>
                {/* Top Panel */}
                <mesh position={[0, h / 2 - thickness / 2, 0]}>
                    <boxGeometry args={[w, thickness, d]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.99}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={0.003}
                        specularIntensity={1}
                        clearcoat={1}
                    />
                </mesh>

                {/* Front Panel */}
                <mesh position={[0, 0, d / 2 - thickness / 2]}>
                    <boxGeometry args={[w, h - thickness * 2, thickness]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.99}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={0.003}
                    />
                </mesh>

                {/* Back Panel */}
                <mesh position={[0, 0, -d / 2 + thickness / 2]}>
                    <boxGeometry args={[w, h - thickness * 2, thickness]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.99}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={0.003}
                    />
                </mesh>

                {/* Left Panel */}
                <mesh position={[-w / 2 + thickness / 2, 0, 0]}>
                    <boxGeometry args={[thickness, h - thickness * 2, d - thickness * 2]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.99}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={0.003}
                    />
                </mesh>

                {/* Right Panel */}
                <mesh position={[w / 2 - thickness / 2, 0, 0]}>
                    <boxGeometry args={[thickness, h - thickness * 2, d - thickness * 2]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.99}
                        opacity={1}
                        metalness={0}
                        roughness={0}
                        ior={1.5}
                        thickness={0.003}
                    />
                </mesh>

                {/* Edges Lines for better visibility */}
                <lineSegments position={[0, 0, 0]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
                    <lineBasicMaterial color="white" transparent opacity={0.1} />
                </lineSegments>
            </group>
        </group>
    );
}

export default function AcrylicViewer3D({ length, width, height, baseType = 'flat', stepsCount = 3 }) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-300 rounded-3xl overflow-hidden relative shadow-inner">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [2, 1.5, 2], fov: 45 }}>
                <PerspectiveCamera makeDefault position={[2.5, 2, 2.5]} />
                <OrbitControls
                    makeDefault
                    minDistance={0.5}
                    maxDistance={5}
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                    target={[0, 0, 0]}
                />

                {/* Richer Lighting Environment */}
                <ambientLight intensity={0.4} />
                <spotLight
                    position={[5, 8, 5]}
                    angle={0.25}
                    penumbra={1}
                    intensity={1.2}
                    castShadow
                    shadow-bias={-0.0001}
                />
                <rectAreaLight width={4} height={4} color={"#ffffff"} intensity={2} position={[-5, 5, 5]} lookAt={[0, 0, 0]} />

                <Environment preset="studio" blur={0.8} />

                <Center top>
                    <AcrylicModel
                        width={length}
                        height={height}
                        depth={width}
                        baseType={baseType}
                        stepsCount={stepsCount}
                    />
                </Center>

                <Grid
                    position={[0, -0.01, 0]}
                    args={[10, 10]}
                    cellSize={0.25}
                    cellThickness={0.5}
                    cellColor="#888"
                    sectionSize={1}
                    sectionThickness={1}
                    sectionColor="#555"
                    fadeDistance={5}
                    infiniteGrid
                />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.2} />
                </mesh>
            </Canvas>
        </div>
    );
}
