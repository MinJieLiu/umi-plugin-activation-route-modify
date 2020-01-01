import React from 'react';
import { router, RouterTypes } from 'umi';

const UserInfo: React.FC<RouterTypes<{}, { id: string }>> = ({ computedMatch: { params } }) => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Page UserInfo</h1>
      <a onClick={router.goBack}>Go back</a>
      <div>params: {params.id}</div>
      <div>
        Count: {count} <button onClick={() => setCount(count + 1)}>Add</button>
      </div>
    </div>
  );
};

export default UserInfo;
