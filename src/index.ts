import { IApi } from 'umi-types';

interface IOptions {
  exclude: (string | RegExp)[];
}

/**
 * 获取路由列表
 *
 * 不包含 layout
 * @param routes
 */
function getFlatRouteList(routes) {
  return routes
    .filter(n => n.path)
    .reduce((prev, curr) => {
      if (!curr.routes) {
        return prev.concat(curr);
      }
      // 过滤节点上有 routes 的 layout
      return prev.concat(getFlatRouteList(curr.routes));
    }, []);
}

// umi-plugin-activation-route-modify
export default function(api: IApi, options: IOptions) {
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
    const flatRouteList = getFlatRouteList(api.routes);
    const exclude = options && options.exclude;
    const routePath = flatRouteList.find(n => n.component === args.component)?.path;

    if (!routePath) {
      return memo;
    }

    if (exclude) {
      const isExclude = exclude.some((item: string | RegExp) => {
        if (item instanceof RegExp) {
          return item.test(routePath);
        }
        return item === routePath;
      });

      if (isExclude) {
        return memo;
      }
    }
    return `wrapChildrenWithKeepAlive(${memo}, '${routePath}')`;
  });

  api.modifyAFWebpackOpts(memo => {
    // 注入 babel 插件 react-activation/babel
    const extraBabelPlugins = [...(memo.extraBabelPlugins || []), 'react-activation/babel'];

    return {
      ...memo,
      extraBabelPlugins,
    };
  });
}
