import React from 'react';
import { router } from 'umi';

export default function() {
  return (
    <div>
      <h1>Page userInfo</h1>
      <a onClick={router.goBack}>Go back</a>
    </div>
  );
}
