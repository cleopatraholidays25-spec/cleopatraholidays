// FIX: Import `React` to resolve the "Cannot find namespace 'React'" error. The `React.FC` type requires the `React` module to be in scope.
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
