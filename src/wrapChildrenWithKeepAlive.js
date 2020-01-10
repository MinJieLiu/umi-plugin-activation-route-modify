import React from 'react';
import { KeepAlive } from 'react-activation';

/**
 * 创建 KeepAliveWrap
 * - 避免每次渲染后返回新组件
 */
function createKeepAliveFunc() {
  let Component;
  let routePath;

  function KeepAliveWrap(props) {
    const {
      location: { pathname, search },
      match: { params },
    } = props;

    return (
      <KeepAlive
        name={pathname + search}
        id={pathname + search}
        routePath={routePath}
        pathname={pathname}
        params={params}
        search={search}
      >
        <Component {...props} />
      </KeepAlive>
    );
  }

  return (NextComponent, nextRoutePath) => {
    Component = NextComponent;
    routePath = nextRoutePath;

    return KeepAliveWrap;
  };
}

export default createKeepAliveFunc();
