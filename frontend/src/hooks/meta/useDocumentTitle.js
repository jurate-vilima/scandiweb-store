import { useEffect } from 'react';
import { getPageTitle } from '@/utils/metaUtils';

export function useDocumentTitle(title, isReady = true, deps = []) {
    useEffect(() => {
        if (isReady && title) {
            document.title = getPageTitle(title);
        }
    }, [title, isReady, ...deps]);
}
