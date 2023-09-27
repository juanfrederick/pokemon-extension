module.exports = {
    content: ['./src/**/*.{html,js,jsx,tsx}'],
    theme: {
        extend: {
            colors:{
                default:{
                    100: "#6F767E",
                    200: "#33383F",
                    300: "#4F4F4F",
                    400: "#1A1D1F",
                    500: "#000000"
                },
                plain:{
                    100: "#F4F4F4",
                    200: "#FFFFFF"
                },
                error: "#FF0000",
                info: "#2A85FF"
            },
            fontFamily: {
                inter: ['Inter', "sans-serif"]
            }
        },
    },
    plugins: [],
};
