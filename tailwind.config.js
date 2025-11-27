/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                pixel: ['"Cubic 11"', 'monospace'],
            },
            colors: {
                pixel: {
                    bg: '#F0E8D8',
                    border: '#2C2C2C',
                    red: '#FF3333',
                    blue: '#3366FF',
                    green: '#33CC66',
                    yellow: '#FFD700',
                    orange: '#FF8844',
                },
            },
            boxShadow: {
                pixel: '2px 2px 0px 0px rgba(0,0,0,0.25)',
                'pixel-lg': '3px 3px 0px 0px rgba(0,0,0,0.25)',
            },
        },
    },
    plugins: [],
}
