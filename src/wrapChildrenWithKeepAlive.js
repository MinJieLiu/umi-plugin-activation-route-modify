import React from 'react';
import { KeepAlive } from 'react-activation';

export default (Component, routePath) => props => {
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
};
