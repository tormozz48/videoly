module.exports = {
    extends: 'gemini-testing',
    root: true,
    parserOptions: {
        ecmaVersion: 2017
    },
    plugins: ['async-await'],
    rules: {
        'async-await/space-after-async': 1,
        'async-await/space-after-await': 1
    }
};
