module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        'no-var': 'error',
        "indent": ["error",2],
        "linebreak-style": ["error","unix"],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2, {'before': false, 'after': true}],
        'comma-style': [2, 'last'],
        'computed-property-spacing': [2, 'never'],
    }
};