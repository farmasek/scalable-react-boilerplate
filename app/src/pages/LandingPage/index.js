import React from 'react';
import cssModules from 'react-css-modules';
import { LandingContainer } from 'containers'; // eslint-disable-line
import styles from './index.module.scss';

// Pages map directly to Routes, i.e. one page equals on Route
// Handler that maps to a route in /utils/routes
const LandingPage = (props) => (
  <div>
    <FeatureFirstContainer
      {...props}
    />
  </div>
);

export default cssModules(LandingPage, styles);
