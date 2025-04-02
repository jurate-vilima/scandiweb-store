import { useMemo } from 'react';
import { getCategoryDisplayName } from '@/utils/categoryUtils';

export function useCategoryDisplayName(categories, categoryName) {
    return useMemo(() => {
        return getCategoryDisplayName(categories, categoryName);
    }, [categories, categoryName]);
}
