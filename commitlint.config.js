module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['release', 'acai', 'acai-cli', 'website']],
        'scope-empty': [0]
    }
};
