import React from 'react';
import PropTypes from 'prop-types';
import styles from './AttributeGroup.module.scss';
import { AttributeItem } from '@/components/Attribute';
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel';
import { kebabCase } from '@/utils/stringUtils';

function AttributeGroup({ attr, selectedValue, onSelect, variant }) {
    const attrKebab = kebabCase(attr.name);
    const labelClass =
        variant === 'compact'
            ? styles.attributeNameCompact
            : styles.attributeName;

    return (
        <div
            className={styles.attributeItem}
            data-testid={`product-attribute-${attrKebab}`}
        >
            <SectionLabel className={labelClass}>{attr.name}:</SectionLabel>
            <div className={styles.attributeOptions}>
                {attr.items.map((item) => (
                    <AttributeItem
                        key={item.id || item.value}
                        attr={attr}
                        item={item}
                        isSelected={selectedValue === item.value}
                        onSelect={onSelect}
                        variant={variant}
                    />
                ))}
            </div>
        </div>
    );
}

AttributeGroup.propTypes = {
    attr: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['swatch', 'text']).isRequired,
        items: PropTypes.array.isRequired,
    }).isRequired,
    selectedValue: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['default', 'compact']),
};

export default AttributeGroup;
