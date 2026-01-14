import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ClosetModel({ width, height, depth, modules, melamine, hasDoors, doorsOpen, internalConfig = {} }) {
    const texture = useTexture(melamine.texture);

    // Configure texture for realistic wood grain
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(width / 1000, height / 1000);

    // Convert mm to meters for Three.js (scale down)
    const w = width / 1000;
    const h = height / 1000;
    const d = depth / 1000;
    const thickness = 0.018; // 18mm panels

    // Calculate module width
    const moduleWidth = w / modules;

    const renderModuleContent = (moduleIndex, xPos) => {
        const type = internalConfig[moduleIndex] || 'shelves';
        // Content area dimensions (internal)
        const innerW = moduleWidth - thickness;
        const innerH = h - thickness * 2;

        switch (type) {
            case 'drawers': // 3 Drawers at bottom + 2 shelves above
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* 3 Drawers */}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <mesh key={`drawer-${i}`} position={[0, -h / 2 + thickness + 0.1 + (i * 0.2), d / 2 - 0.02]}>
                                <boxGeometry args={[innerW - 0.005, 0.19, 0.02]} /> {/* Drawer Front */}
                                <meshStandardMaterial map={texture} roughness={0.6} />
                            </mesh>
                        ))}
                        {/* Drawer boxes (behind fronts) - simplified */}
                        {Array.from({ length: 3 }).map((_, i) => (
                            <mesh key={`drawerbox-${i}`} position={[0, -h / 2 + thickness + 0.1 + (i * 0.2), 0]}>
                                <boxGeometry args={[innerW - 0.01, 0.18, d - 0.05]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                        ))}

                        {/* 2 Shelves above */}
                        <mesh position={[0, 0.1, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        <mesh position={[0, 0.5, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                    </group>
                );
            case 'hanging_long': // 1 Rod + 1 Shelf
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* Shelf High */}
                        <mesh position={[0, h / 2 - 0.4, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        {/* Rod */}
                        <mesh position={[0, h / 2 - 0.5, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, innerW - 0.01]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                );
            case 'hanging_short': // 2 Rods + 1 Shelf
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* Shelf Mid */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        {/* Shelf High */}
                        <mesh position={[0, h / 2 - 0.4, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        {/* Rod Top */}
                        <mesh position={[0, h / 2 - 0.5, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, innerW - 0.01]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Rod Mid */}
                        <mesh position={[0, -0.1, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, innerW - 0.01]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                );
            case 'shelves': // Default 4 shelves
            default:
                return (
                    <group position={[xPos, 0, 0]}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <mesh key={i} position={[0, -h / 2 + (h / 5) * (i + 1), 0]}>
                                <boxGeometry args={[innerW, thickness, d - 0.05]} />
                                <meshStandardMaterial map={texture} />
                            </mesh>
                        ))}
                    </group>
                );
        }
    };

    return (
        <group>
            {/* Back Panel */}
            <mesh position={[0, 0, -d / 2]}>
                <boxGeometry args={[w, h, thickness]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Left Side Panel */}
            <mesh position={[-w / 2 + thickness / 2, 0, 0]}>
                <boxGeometry args={[thickness, h, d]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Right Side Panel */}
            <mesh position={[w / 2 - thickness / 2, 0, 0]}>
                <boxGeometry args={[thickness, h, d]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Top Panel */}
            <mesh position={[0, h / 2 - thickness / 2, 0]}>
                <boxGeometry args={[w, thickness, d]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Bottom Panel */}
            <mesh position={[0, -h / 2 + thickness / 2, 0]}>
                <boxGeometry args={[w, thickness, d]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Module Dividers */}
            {Array.from({ length: modules - 1 }).map((_, i) => {
                const x = -w / 2 + moduleWidth * (i + 1);
                return (
                    <mesh key={i} position={[x, 0, 0]}>
                        <boxGeometry args={[thickness, h - thickness * 2, d - thickness]} />
                        <meshStandardMaterial
                            map={texture}
                            roughness={0.6}
                            metalness={0.1}
                        />
                    </mesh>
                );
            })}

            {/* Zones Content */}
            {Array.from({ length: modules }).map((_, moduleIdx) => {
                const moduleX = -w / 2 + moduleWidth * moduleIdx + moduleWidth / 2;
                return (
                    <group key={moduleIdx}>
                        {renderModuleContent(moduleIdx, moduleX)}
                    </group>
                );
            })}

            {/* Doors (Conditional & Rotatable) */}
            {hasDoors && (
                <>
                    {/* Left Door - Pivots on Left Edge */}
                    <group
                        position={[-w / 2, 0, d / 2 + 0.02]}
                        rotation={[0, doorsOpen ? -Math.PI / 1.5 : 0, 0]}
                    >
                        <mesh position={[w / 4, 0, 0]}> {/* Offset to center relative to pivot */}
                            <boxGeometry args={[w / 2 + 0.01, h - 0.05, 0.018]} />
                            <meshStandardMaterial
                                map={texture}
                                roughness={0.4}
                                transparent
                                opacity={0.95}
                            />
                        </mesh>
                        {/* Handle */}
                        <mesh position={[w / 2 - 0.1, 0, 0.03]}>
                            <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    </group>

                    {/* Right Door - Pivots on Right Edge */}
                    <group
                        position={[w / 2, 0, d / 2 + 0.02]}
                        rotation={[0, doorsOpen ? Math.PI / 1.5 : 0, 0]}
                    >
                        <mesh position={[-w / 4, 0, 0]}> {/* Offset to center relative to pivot */}
                            <boxGeometry args={[w / 2 + 0.01, h - 0.05, 0.018]} />
                            <meshStandardMaterial
                                map={texture}
                                roughness={0.4}
                                transparent
                                opacity={0.95}
                            />
                        </mesh>
                        {/* Handle */}
                        <mesh position={[-w / 2 + 0.1, 0, 0.03]}>
                            <cylinderGeometry args={[0.01, 0.01, 0.2]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    </group>
                </>
            )}
        </group>
    );
}

export default function ClosetViewer3D({ width, height, depth, modules, melamine, hasDoors, doorsOpen, internalConfig }) {
    const controlsRef = useRef();

    return (
        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-hidden">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[3, 2, 4]} fov={50} />
                <OrbitControls
                    ref={controlsRef}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={2}
                    maxDistance={8}
                    maxPolarAngle={Math.PI / 2}
                />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <spotLight
                    position={[0, 3, 3]}
                    intensity={0.5}
                    angle={0.6}
                    penumbra={0.5}
                    castShadow
                />

                {/* Environment for reflections */}
                <Environment preset="apartment" />

                {/* Closet Model */}
                <ClosetModel
                    width={width}
                    height={height}
                    depth={depth}
                    modules={modules}
                    melamine={melamine}
                    hasDoors={hasDoors}
                    doorsOpen={doorsOpen}
                    internalConfig={internalConfig}
                />

                {/* Ground plane for shadows */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -height / 2000 - 0.01, 0]} receiveShadow>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.2} />
                </mesh>
            </Canvas>
        </div>
    );
}
