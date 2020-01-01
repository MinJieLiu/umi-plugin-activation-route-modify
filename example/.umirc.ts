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
    ['umi-plugin-activation-route-modify', { exclude: ['/test'] }],
  ],
} as IConfig;
