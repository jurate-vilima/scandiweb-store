import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Loader;
