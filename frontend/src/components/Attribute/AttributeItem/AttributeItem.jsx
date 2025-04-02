import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './AttributeItem.module.scss';
import { isColorLight } from '@/utils/colorUtils';
import { formatAttributeValue } from '@/utils/attributeUtils';
import { kebabCase } from '@/utils/stringUtils';

function AttributeItem({ attr, item, isSelected, onSelect, variant }) {
    const isSwatch = attr.type === 'swatch';
    const attrKebab = kebabCase(attr.name);
    const valueKebab = kebabCase(item.value);

    const className = clsx({
        [styles.colorSwatch]: isSwatch,
        [styles.textSwatch]: !isSwatch,
        [styles.compact]: variant === 'compact',
        [styles.selected]: isSelected,
    });

    const style = isSwatch
        ? {
              backgroundColor: item.value,
              border: isColorLight(item.value) ? '1px solid #ccc' : 'none',
          }
        : undefined;

    return (
        <button
            type="button"
            className={className}
            style={style}
            title={`${attr.name}: ${item.displayValue}`}
            aria-pressed={isSelected}
            aria-label={`${attr.name}: ${item.displayValue}`}
            data-testid={`product-attribute-${attrKebab}-${valueKebab}${
                isSelected ? '-selected' : ''
            }`}
            onClick={() => onSelect(attr.name, item.value)}
        >
            {!isSwatch && formatAttributeValue(attr, item)}
        </button>
    );
}

AttributeItem.propTypes = {
    attr: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['swatch', 'text']).isRequired,
    }).isRequired,
    item: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string.isRequired,
        displayValue: PropTypes.string,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['default', 'compact']),
};

export default AttributeItem;
