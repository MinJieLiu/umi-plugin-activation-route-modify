import React from 'react';
import { KeepAlive } from 'react-activation';

/**
 * 创建 KeepAliveWrap
 * - 避免每次渲染后返回新组件
 */
function createKeepAliveFunc() {
  let Component;
  let PageLayout;
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
        {PageLayout ? (
          <PageLayout>
            <Component {...props} />
          </PageLayout>
        ) : (
          <Component {...props} />
        )}
      </KeepAlive>
    );
  }

  return (NextComponent, NextPageLayout, nextRoutePath) => {
    Component = NextComponent;
    PageLayout = NextPageLayout;
    routePath = nextRoutePath;

    return KeepAliveWrap;
  };
}

export default createKeepAliveFunc();
