import React from 'react';
import PropTypes from 'prop-types';

function SectionLabel({ children, className = '' }) {
    return <strong className={className}>{children}</strong>;
}

SectionLabel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default SectionLabel;
