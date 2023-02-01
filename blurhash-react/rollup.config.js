import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [{
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [
    esbuild({
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        // __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
    }),
  ],
}, {
  input: "src/index.ts",
  output: [{ file: "dist/type.d.ts", format: "es" }],
  plugins: [dts()],
}]