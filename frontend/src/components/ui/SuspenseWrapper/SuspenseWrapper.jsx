import React, { Suspense } from 'react';
import Loader from '@/components/ui/Loader/Loader';

const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<Loader />}>{children}</Suspense>
);

export default SuspenseWrapper;
