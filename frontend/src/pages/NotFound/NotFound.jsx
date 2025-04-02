import React, { useEffect } from 'react';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useDocumentTitle } from '@/hooks/meta/useDocumentTitle';

function NotFound() {
    useDocumentTitle('Page Not Found');

    return (
        <EmptyState
            statusCode={404}
            title="Page Not Found"
            message="Sorry, the page you're looking for does not exist."
        />
    );
}

export default NotFound;
