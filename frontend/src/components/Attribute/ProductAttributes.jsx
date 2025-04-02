import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AttributeGroup } from '@/components/Attribute';

function ProductAttributes({
    attributes,
    selectedAttributes,
    onSelect,
    className = '',
    variant = 'default',
}) {
    if (!attributes?.length) return null;

    return (
        <div className={clsx(className)}>
            {attributes.map((attr) => (
                <AttributeGroup
                    key={attr.id || attr.name}
                    attr={attr}
                    selectedValue={selectedAttributes[attr.name]}
                    onSelect={onSelect}
                    variant={variant}
                />
            ))}
        </div>
    );
}

ProductAttributes.propTypes = {
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['swatch', 'text']).isRequired,
            items: PropTypes.array.isRequired,
        }),
    ).isRequired,
    selectedAttributes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'compact']),
};

export default ProductAttributes;
