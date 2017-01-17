import React from 'react';
import styles from './index.module.scss';
import cssModules from 'react-css-modules';
import Navigation from 'react-toolbox/lib/navigation';
import { Link } from 'react-router';

const Navbar = () => (
  <div>
    <Navigation type="horizontal">
      <Link to="#">First page</Link>
      <Link to="#">Second page</Link>
    </Navigation>
  </div>
);

Navbar.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Navbar;
