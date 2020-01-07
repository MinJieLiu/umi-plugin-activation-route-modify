import React from 'react';
import { router } from 'umi';

export default function() {
  return (
    <div>
      <h1>Page demo</h1>
      <a onClick={router.goBack}>Go back</a>
      <div>demo</div>
    </div>
  );
}
