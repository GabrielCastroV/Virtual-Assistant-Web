/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./views/**/*.{html,js}'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'allports': {
                '50': '#f0f9ff',
                '100': '#dff3ff',
                '200': '#b9e8fe',
                '300': '#7bd8fe',
                '400': '#34c3fc',
                '500': '#0aaded',
                '600': '#008acb',
                '700': '#0073ab',
                '800': '#055e87',
                '900': '#0a4d70',
                '950': '#07314a',
            },
            'red': {
                '50': '#fff0f0',
                '100': '#ffdddd',
                '200': '#ffc0c0',
                '300': '#ff9494',
                '400': '#ff5757',
                '500': '#ff2323',
                '600': '#ff0000',
                '700': '#d70000',
                '800': '#b10303',
                '900': '#920a0a',
                '950': '#500000',
            },

        },
        extend: {},
    },
    plugins: [],
};

