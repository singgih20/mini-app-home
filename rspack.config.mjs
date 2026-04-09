import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default Repack.defineRspackConfig(({ platform }) => ({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
  },
  output: {
    uniqueName: 'MiniAppHome',
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'MiniAppHome',
      filename: 'MiniAppHome.container.js.bundle',
      dts: false,
      exposes: {
        './HomeScreen': './src/HomeScreen',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-native': { singleton: true, eager: true },
      },
    }),
  ],
}));