/**
 * 获取路由列表
 */
export function generateFlatRouteFunc() {
  let savedRoutes = [];
  let hasGot = false;

  return function getFlatRouteList(routes) {
    if (hasGot) {
      return savedRoutes;
    }
    savedRoutes = routes
      .filter(n => n.path)
      .reduce((prev, curr) => {
        if (!curr.routes) {
          return prev.concat(curr);
        }
        // 过滤节点上有 routes 的 layout
        return prev.concat(getFlatRouteList(curr.routes));
      }, []);
    hasGot = true;
    return savedRoutes;
  };
}
