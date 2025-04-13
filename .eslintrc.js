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
    'eslint:recommended',
    'plugin:import/recommended',
  ],
  plugins: ['import'],
  parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off'
      }
    }
  ],
  ignorePatterns: ['prisma/**/*.ts', '**.spec.ts', 'src/**/*.test.ts', '**.d.ts', '**/vendor/*.js', '**/.eslintrc.js']
};
