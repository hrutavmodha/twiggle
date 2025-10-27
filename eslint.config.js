import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
    {
        ignores: [
            './**/**/dist/',
            './**/**/types/',
            'build',
            'node_modules',
            'website',
            '.docusaurus',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            'prettier/prettier': 'warn',
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    }
)
