import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';

const AppFooter = () => (
  <div className={styles.footerino}>
    Footer with custom scss style.
  </div>
);

export default cssModules(AppFooter, styles);
