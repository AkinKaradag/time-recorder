import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': ts,
            prettier,
        },
        rules: {
            ...vue.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            'prettier/prettier': 'warn',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
