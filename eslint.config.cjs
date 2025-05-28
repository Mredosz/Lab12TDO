module.exports = [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                test: 'readonly',
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error'
        }
    }
];
