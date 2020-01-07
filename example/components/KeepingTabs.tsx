import React from 'react';
import { Link } from 'umi';
import { useAliveController } from 'react-activation';

import styles from './KeepingTabs.less';

export default function KeepingTabs() {
  const { getCachingNodes, drop } = useAliveController();
  const cachingNodes = getCachingNodes();

  return (
    <div>
      {cachingNodes.map(node => (
        <Link key={node.id} className={styles.keepingTab} to={node.name} replace>
          {node.name}
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              drop(node.name);
            }}
          >
            X
          </button>
        </Link>
      ))}
    </div>
  );
}
