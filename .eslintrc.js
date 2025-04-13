module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard',
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: ['import'],
  parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['standard-with-typescript'],
      plugins: ['import'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/internal-regex': '^@',
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true
          }
        }
      },
      rules: {
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off'
      }
    }
  ],
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  ignorePatterns: ['prisma/**/*.ts', '**.spec.ts', 'src/**/*.test.ts', '**.d.ts', '**/vendor/*.js', '**/.eslintrc.js']
};
