const svgToDataUri = require('mini-svg-data-uri')

module.exports = {
    //mode: 'jit',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            poppins: ['"Poppins"', 'poppins'],
        },
    },
    plugins: [require('@tailwindcss/custom-forms')],
}
