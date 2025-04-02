import React, { useContext, useMemo } from 'react';
import { CategoryContext } from '@/contexts/CategoryContext';
import styles from './CategoryHeader.module.scss';

function CategoryHeader({ categoryName }) {
    const { categories } = useContext(CategoryContext);

    const displayName = useMemo(() => {
        return (
            categories.find(
                (category) =>
                    (category.name || '').toLowerCase() ===
                    categoryName.toLowerCase(),
            )?.displayName || categoryName
        );
    }, [categories, categoryName]);

    return (
        <h1 className={styles.title}>{(displayName || '').toUpperCase()}</h1>
    );
}

export default CategoryHeader;
