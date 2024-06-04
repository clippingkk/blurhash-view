import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import pkg from './package.json' with { type: "json" }

export default [{
  input: 'src/index.ts',
  output: {
    // file: 'dist/index.js',
    dir: './dist',
    preserveModules: true,
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
        __VERSION__: `'"${pkg.version}"'`,
      },
      tsconfig: 'tsconfig.json', // default
    }),
    preserveDirectives(),
  ],
}, {
  input: "src/index.ts",
  output: [{ file: "dist/type.d.ts", format: "es" }],
  plugins: [dts()],
}]