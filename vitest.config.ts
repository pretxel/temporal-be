import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./tests/setup.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    resolve: {
        alias: {
            '@domain': path.resolve(__dirname, './src/domain'),
            '@application': path.resolve(__dirname, './src/application'),
            '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
            '@utils': path.resolve(__dirname, './src/utils')
        },
    },
}) 