export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                console: "readonly",
            },
        },
        env: {
            browser: true,
            node: true,
        },
        rules: {
        },
    },
];
