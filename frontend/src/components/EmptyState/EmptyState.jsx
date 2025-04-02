import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmptyState.module.scss';

function EmptyState({ title, message, statusCode = null }) {
    return (
        <div className={styles.wrapper}>
            {statusCode && <h1>{statusCode}</h1>}
            {title && <h2>{title}</h2>}
            {message && <p>{message}</p>}
        </div>
    );
}

EmptyState.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    statusCode: PropTypes.number,
};

export default EmptyState;
