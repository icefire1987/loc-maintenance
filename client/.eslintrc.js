module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/sort-comp': 0,
        'comma-dangle': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'class-methods-use-this': 0,
        'react/no-typos': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-is-valid': ['error', {
            components: ['Link'],
            specialLink: ['to'],
        }],
    },
};
