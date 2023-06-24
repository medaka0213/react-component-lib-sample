import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'dist/esm/index.js',
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      commonjs({
        include: ['node_modules/**'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**'],
      }),
      nodeResolve(),
      json(),
    ],
    external: ['react', 'react-dom', '@emotion/styled', '@emotion/react'],
  },
  {
    input: 'src/models/index.ts',
    output: [
      {
        file: 'dist/cjs/models.js',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'dist/esm/models.js',
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      commonjs({
        include: ['node_modules/**'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**'],
      }),
      nodeResolve(),
      json(),
    ],
    external: ['react', 'react-dom', '@emotion/styled', '@emotion/react'],
  },
  {
    input: 'dist/cjs/index.d.ts',
    output: [{ file: 'dist/cjs/index.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/esm/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
  {
    input: 'dist/cjs/models/index.d.ts',
    output: [{ file: 'dist/cjs/models.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
  {
    input: 'dist/esm/models/index.d.ts',
    output: [{ file: 'dist/esm/models.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
