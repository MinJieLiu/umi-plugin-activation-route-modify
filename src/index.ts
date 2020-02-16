import { IApi } from 'umi-types';
import { join } from 'path';
import { generateFlatRouteFunc } from './utils';

interface IOptions {
  exclude: (string | RegExp)[];
  enablePageLayout?: boolean;
}

/**
 * 获取路由列表
 * 不包含 layout
 * @param routes
 */
const getFlatRouteList = generateFlatRouteFunc();

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

  // 添加 layout 布局
  if (options.enablePageLayout) {
    const PageLayout = join(api.paths.absSrcPath, 'layouts', 'PageLayout');
    api.addRouterImport({
      source: PageLayout,
      specifier: `PageLayout`,
    });
  }

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
    if (memo.includes('_dvaDynamic')) {
      const { importPath, webpackChunkName } = args;
      const dynamicImport = `import(/* webpackChunkName: ^${webpackChunkName}^ */'${importPath}')`;
      const Layout = options.enablePageLayout ? 'PageLayout' : null;

      return memo.replace(
        dynamicImport,
        `${dynamicImport}.then(m => wrapChildrenWithKeepAlive(m.default, ${Layout}, '${routePath}'))`,
      );
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
