import { join } from 'path';
import { IConfig } from 'umi-types';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        routes: {
          exclude: [
            /models\//,
            /components\//,
            /services\//,
            /containers\//,
            /locales\//,
            /.+\.less$/,
          ],
        },
        dynamicImport: {
          loadingComponent: './components/Spinner',
          webpackChunkName: true,
          level: 3,
        },
      },
    ],
    join(__dirname, '..', require('../package').main || 'index.js'),
  ],
} as IConfig;
