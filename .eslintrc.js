const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'standard-with-typescript',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.base.json', './tsconfig.eslint.json', './tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // 插件配置:
        'import/extensions': [
            ERROR,
            'never',
            {
                json: 'never',
                config: 'always',
            },
        ],
        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        'import/prefer-default-export': OFF,
        'import/no-unresolved': OFF,
        'import/no-dynamic-require': OFF,
        'import/no-named-as-default': OFF,
        'import/no-named-as-default-member': OFF,

        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/strict-boolean-expressions': OFF,

        // 原生配置
        'default-param-last': OFF,
        'no-unused-expressions': [ERROR, { allowShortCircuit: true, allowTernary: true }],
        'no-plusplus': OFF,
        'no-console': WARN,
        'no-void': OFF,
        'no-use-before-define': OFF,
        'no-restricted-syntax': OFF,
        'no-continue': OFF,
        'no-shadow': OFF,
        'no-underscore-dangle': OFF,
        'no-param-reassign': [ERROR, { props: false }],
        'lines-between-class-members': [ERROR, 'always'],
        indent: [ERROR, 4, { SwitchCase: 1 }],
        'linebreak-style': [ERROR, 'unix'],
        quotes: [ERROR, 'single'],
        semi: [ERROR, 'always'],
        'class-methods-use-this': ERROR,
        'jsx-quotes': [ERROR, 'prefer-double'],
        'global-require': OFF,
        'arrow-parens': [ERROR, 'as-needed'],
        'arrow-body-style': [ERROR, 'as-needed'],
        'object-curly-newline': [ERROR, { consistent: true }],
        'comma-dangle': [ERROR, 'only-multiline'],
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before',
                },
            },
        ],
        radix: [ERROR, 'as-needed'],
        'consistent-return': OFF,
        'max-len': [ERROR, { ignoreComments: true, code: 100 }],
        'prefer-template': OFF,
        'prefer-destructuring': OFF,
    },
};
