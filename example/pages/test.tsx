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
        <Link to="/user/1">to User 1</Link>
      </div>
      <div>
        <Link to="/user/2">to User 2</Link>
      </div>
      <div>
        <Link to="/user/2?name=jack">to User 2 with query</Link>
      </div>
      <div>
        <Link to="/user/3">to User 3</Link>
      </div>
    </div>
  );
}
