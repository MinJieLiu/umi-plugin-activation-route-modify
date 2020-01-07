import React from 'react';
import { Link } from 'umi';

export default function() {
  return (
    <div>
      <h1>Page index</h1>
      <div>index</div>
      <div>
        <Link to="/test">to test</Link>
      </div>
      <div>
        <Link to="/demo">to demo</Link>
      </div>
    </div>
  );
}
