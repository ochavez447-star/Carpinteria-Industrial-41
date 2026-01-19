/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    // "Warm Architectural" Palette (Tylko/Reform CPH Style)
                    wood: '#4A3728', // Dark Walnut (Premium & Grounded)
                    dark: '#1C1917', // Stone 900 (Softer than black)
                    light: '#FAFAF9', // Stone 50 (Warm White - Not sterile)
                    secondary: '#E7E5E4', // Stone 200 (Distinct separation)
                    accent: '#F97316', // Bright Orange (Active UI elements)
                    border: '#D6D3D1', // Stone 300 (UI Borders)

                    // Legacy Backups
                    // wood: '#6D7A4D',
                    // accent: '#EA580C', 
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
