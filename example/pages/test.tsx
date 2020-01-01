import React from 'react';
import { Link, router } from 'umi';

export default function() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Page test</h1>
      <a onClick={router.goBack}>Go back</a>
      <div>test</div>
      <div>
        Count: {count} <button onClick={() => setCount(count + 1)}>Add</button>
      </div>
      <div>
        <Link to="/user/info">to UserInfo</Link>
      </div>
    </div>
  );
}
