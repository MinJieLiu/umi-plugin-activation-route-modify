import React from 'react';
import { Link } from 'umi';

import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <Link to="/test">to test</Link>
    </div>
  );
}
