import React from 'react';
import { KeepAlive } from 'react-activation';

export default (Component, name) => props => (
  <KeepAlive name={name}>
    <Component {...props} />
  </KeepAlive>
);
