'use client';
import { Fragment, useEffect, useState } from 'react';

/* Views */
import Login from '../../views/login/page';

/* Components */
import { Navbar } from '@Components/index';


export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /* useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);*/

  /* if (!isAuthenticated) {
    return <Login />;
  } */

  if (false) {
    return <Login />;
  }

  return (
    <Fragment>
        <Navbar />
        <main>{ children }</main>
    </Fragment>
  );
}