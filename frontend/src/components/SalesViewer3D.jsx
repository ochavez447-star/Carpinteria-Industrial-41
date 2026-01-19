import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Sub-component for a single wall unit
function ClosetWall({ width, height, depth, modules, melamine, internalConfig = {}, position = [0, 0, 0], rotation = [0, 0, 0], wallId }) {
    const texture = useTexture(melamine.texture);

    // Texture settings
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(width / 1000, height / 1000);

    const w = width / 1000;
    const h = height / 1000;
    const d = depth / 1000;
    const thickness = 0.018;
    const moduleWidth = w / modules;

    const renderModuleContent = (moduleIndex, xPos) => {
        // Look up config using wallID + index (e.g., "A-0")
        const type = internalConfig[`${wallId}-${moduleIndex}`] || 'shelves';
        const innerW = moduleWidth - thickness;

        switch (type) {
            case 'drawers':
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* 3 Drawers at bottom */}
                        {[0, 1, 2].map(i => (
                            <mesh key={`d${i}`} position={[0, -h / 2 + 0.15 + (i * 0.22), d / 2 - 0.01]}>
                                <boxGeometry args={[innerW - 0.01, 0.20, 0.02]} />
                                <meshStandardMaterial map={texture} />
                            </mesh>
                        ))}
                        {/* Drawer body placeholder */}
                        <mesh position={[0, -h / 2 + 0.45, 0]}>
                            <boxGeometry args={[innerW - 0.02, 0.7, d - 0.05]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                        {/* Shelves above */}
                        {[0.1, 0.6].map((y, i) => (
                            <mesh key={`s${i}`} position={[0, y, 0]}>
                                <boxGeometry args={[innerW, thickness, d - 0.05]} />
                                <meshStandardMaterial map={texture} />
                            </mesh>
                        ))}
                    </group>
                );
            case 'hanging_short':
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* Shelf Mid */}
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        {/* Rod High */}
                        <mesh position={[0, h / 2 - 0.3, 0]}>
                            <cylinderGeometry args={[0.012, 0.012, innerW - 0.02]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#999" metalness={0.8} />
                        </mesh>
                        {/* Rod Low */}
                        <mesh position={[0, -0.1, 0]}>
                            <cylinderGeometry args={[0.012, 0.012, innerW - 0.02]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#999" metalness={0.8} />
                        </mesh>
                    </group>
                );
            case 'hanging_long':
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* Shelf High */}
                        <mesh position={[0, h / 2 - 0.3, 0]}>
                            <boxGeometry args={[innerW, thickness, d - 0.05]} />
                            <meshStandardMaterial map={texture} />
                        </mesh>
                        {/* Rod High */}
                        <mesh position={[0, h / 2 - 0.4, 0]}>
                            <cylinderGeometry args={[0.012, 0.012, innerW - 0.02]} rotation={[0, 0, Math.PI / 2]} />
                            <meshStandardMaterial color="#999" metalness={0.8} />
                        </mesh>
                    </group>
                );
            case 'vitrina': // Premium Glass Door Module
                return (
                    <group position={[xPos, 0, 0]}>
                        {/* Internal Shelves (Glass or Wood?) - Let's do Wood for warmth */}
                        {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
                            <mesh key={i} position={[0, y, 0]}>
                                <boxGeometry args={[innerW - 0.02, thickness, d - 0.1]} />
                                <meshStandardMaterial map={texture} />
                            </mesh>
                        ))}
                        {/* Internal Warm Light Effect */}
                        <pointLight position={[0, h / 2 - 0.2, 0]} intensity={0.5} distance={2} color="#ffaa00" />

                        {/* Glass Door Frame */}
                        <mesh position={[0, 0, d / 2 + 0.01]}>
                            <boxGeometry args={[innerW, h - 0.05, 0.02]} />
                            <meshPhysicalMaterial
                                color="#88ccee"
                                transmission={0.9}
                                opacity={1} // transmission handles opacity for physical material
                                metalness={0}
                                roughness={0}
                                ior={1.5}
                                thickness={0.02}
                                transparent={true} // helper
                            />
                        </mesh>
                        {/* Aluminum Frame Border (Simplified visually) */}
                        <mesh position={[-innerW / 2 + 0.01, 0, d / 2 + 0.012]}>
                            <boxGeometry args={[0.02, h - 0.05, 0.022]} />
                            <meshStandardMaterial color="#111" metalness={0.8} />
                        </mesh>
                        <mesh position={[innerW / 2 - 0.01, 0, d / 2 + 0.012]}>
                            <boxGeometry args={[0.02, h - 0.05, 0.022]} />
                            <meshStandardMaterial color="#111" metalness={0.8} />
                        </mesh>
                    </group>
                );
            case 'shelves':
            default:
                return (
                    <group position={[xPos, 0, 0]}>
                        {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
                            <mesh key={i} position={[0, y, 0]}>
                                <boxGeometry args={[innerW, thickness, d - 0.05]} />
                                <meshStandardMaterial map={texture} />
                            </mesh>
                        ))}
                    </group>
                );
        }
    };

    return (
        <group position={position} rotation={rotation}>
            {/* STRUCTURE (Frame) */}
            {/* Back Panel */}
            <mesh position={[0, 0, -d / 2]}>
                <boxGeometry args={[w, h, thickness]} />
                <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>

            {/* Sides */}
            <mesh position={[-w / 2 + thickness / 2, 0, 0]}>
                <boxGeometry args={[thickness, h, d]} />
                <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>
            <mesh position={[w / 2 - thickness / 2, 0, 0]}>
                <boxGeometry args={[thickness, h, d]} />
                <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>

            {/* Top/Bottom */}
            <mesh position={[0, h / 2 - thickness / 2, 0]}>
                <boxGeometry args={[w, thickness, d]} />
                <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>
            <mesh position={[0, -h / 2 + thickness / 2, 0]}>
                <boxGeometry args={[w, thickness, d]} />
                <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>

            {/* Vertical Dividers */}
            {Array.from({ length: modules - 1 }).map((_, i) => (
                <mesh key={i} position={[-w / 2 + moduleWidth * (i + 1), 0, 0]}>
                    <boxGeometry args={[thickness, h - thickness * 2, d - thickness]} />
                    <meshStandardMaterial map={texture} roughness={0.6} />
                </mesh>
            ))}

            {/* MODULE CONTENT */}
            {Array.from({ length: modules }).map((_, i) => (
                <group key={i}>
                    {renderModuleContent(i, -w / 2 + moduleWidth * i + moduleWidth / 2)}
                </group>
            ))}
        </group>
    );
}

export default function SalesViewer3D({
    layout = 'linear', // linear, L, U
    dimensions = { width: 2400, widthB: 1800, height: 2400, depth: 600 },
    modules = 3,
    melamine,
    internalConfig = {} // Dictionary: "A-0": "drawers", "B-1": "hanging"
}) {
    // Default material fallback
    const defaultMelamine = { texture: '/textures/nogal_terracota.jpg', color_hex: '#4A3728' };
    const activeMelamine = melamine || defaultMelamine;

    // Derived Dimensions for Wall B (L-Shape)
    const widthB = dimensions.widthB || 1800; // Use prop or default
    const modulesB = Math.floor(widthB / 800) + 1; // Approx modules for side wall

    return (
        <div className="w-full h-full bg-stone-100 rounded-xl overflow-hidden shadow-inner">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[4, 2, 5]} fov={45} />
                <OrbitControls
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.8}
                    minDistance={2}
                    maxDistance={10}
                />

                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <Environment preset="apartment" />

                {/* Main Wall (Linear - Always Present) */}
                {/* Positioned slightly left so the corner is near center */}
                <ClosetWall
                    wallId="A"
                    width={dimensions.width}
                    height={dimensions.height}
                    depth={dimensions.depth}
                    modules={modules}
                    melamine={activeMelamine}
                    internalConfig={internalConfig}
                    position={[-dimensions.width / 2000 / 2, 0, 0]}
                />

                {/* L-Shape Logic: Wall B (Right Side Return) */}
                {/* Rotated 90 degrees to form L. Attached to Right end of Main Wall */}
                {(layout === 'L' || layout === 'U') && (
                    <ClosetWall
                        wallId="B"
                        width={widthB}
                        height={dimensions.height}
                        depth={dimensions.depth}
                        modules={modulesB}
                        melamine={activeMelamine}
                        internalConfig={internalConfig}
                        // Mathematics: Start at Right Edge of Wall A (0 + w/2). 
                        // Then move forward by its own half-width (widthB/2).
                        // Overlap correction: -0.6 (approx depth)
                        position={[
                            (dimensions.width / 2000) / 2 - 0.05,
                            0,
                            (widthB / 2000) / 2
                        ]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                )}

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -dimensions.height / 2000 - 0.01, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <shadowMaterial opacity={0.1} />
                </mesh>
            </Canvas>
        </div>
    );
}
