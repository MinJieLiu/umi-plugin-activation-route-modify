import React from 'react';
import { router } from 'umi';

export default function() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Page UserInfo</h1>
      <a onClick={router.goBack}>Go back</a>
      <div>
        Count: {count} <button onClick={() => setCount(count + 1)}>Add</button>
      </div>
    </div>
  );
}
