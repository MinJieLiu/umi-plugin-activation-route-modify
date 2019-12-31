import { IApi } from 'umi-types';

export default function(api: IApi, options) {
  // .umi/route.js 中加入 import wrapChildrenWithAliveScope from 'umi-plugin-keep-alive/lib/wrapChildrenWithAliveScope' 语句
  api.addRouterImport({
    source: 'umi-plugin-activation-route-modify/lib/wrapChildrenWithAliveScope',
    specifier: `wrapChildrenWithAliveScope`,
  });

  // 使 AliveScope 嵌于 Router 与其 children 之间
  const currentModifyRouterRootComponent = api.applyPlugins('modifyRouterRootComponent', {
    initialValue: 'DefaultRouter',
  });
  api.modifyRouterRootComponent(`wrapChildrenWithAliveScope(${currentModifyRouterRootComponent})`);

  // .umi/route.js 中加入 import wrapChildrenWithKeepAlive from 'umi-plugin-keep-alive/lib/wrapChildrenWithKeepAlive' 语句
  api.addRouterImport({
    source: 'umi-plugin-activation-route-modify/lib/wrapChildrenWithKeepAlive',
    specifier: `wrapChildrenWithKeepAlive`,
  });

  api.modifyRouteComponent((memo, args) => {
    return `wrapChildrenWithKeepAlive(${memo})`;
  });
  // routes.forEach(route => {
  //   if (route.path && (options.exclude ? options.exclude.includes(route.path) : true)) {
  //     route.component
  //   }
  // });

  api.modifyAFWebpackOpts(memo => {
    // 注入 babel 插件 react-activation/babel
    const extraBabelPlugins = [...(memo.extraBabelPlugins || []), 'react-activation/babel'];

    return {
      ...memo,
      extraBabelPlugins,
    };
  });
}
