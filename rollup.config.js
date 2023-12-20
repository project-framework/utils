const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');

const projectRootDir = path.resolve(__dirname);

module.exports = [
    {
        input: './packages/index.ts',
        output: [
            {
                dir: 'lib',
                format: 'cjs',
                entryFileNames: '[name].cjs.js',
                sourcemap: false, // 是否输出sourcemap
            },
            {
                dir: 'lib',
                format: 'esm',
                entryFileNames: '[name].esm.js',
                sourcemap: false, // 是否输出sourcemap
            },
            {
                dir: 'lib',
                format: 'umd',
                entryFileNames: '[name].umd.js',
                name: '$utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
                sourcemap: false,
                plugins: [terser()],
            },
        ],
        plugins: [
            alias({
                entries: [{ find: '@', replacement: path.resolve(projectRootDir, 'packages') }],
            }),
            postcss({
                minimize: true,
                extensions: ['.css'],
                extract: true,
                // extract: path.resolve('dist/my-faceapi-js-lib.css'),
            }),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                compilerOptions: { incremental: false }
            }),
        ],
    },
];
