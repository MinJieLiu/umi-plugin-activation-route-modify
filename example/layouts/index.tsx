import React from 'react';
import KeepingTabs from '../components/KeepingTabs';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="app">
      <KeepingTabs />
      {children}
    </div>
  );
};

export default Layout;
