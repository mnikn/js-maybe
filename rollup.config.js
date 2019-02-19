import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
    input: 'src/index.ts',
    output: {
        name: 'nulless',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        typescript(),
        resolve(),
        commonJS()
    ],
    external: ['rxjs']
}