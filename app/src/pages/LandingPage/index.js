import React from 'react';
import cssModules from 'react-css-modules';
import { EpicContainer } from 'containers'; // eslint-disable-line
import styles from './index.module.scss';

const LandingPage = () => (
  <div className={styles.container}>
    <EpicContainer/>
  </div>
);

export default cssModules(LandingPage, styles);
