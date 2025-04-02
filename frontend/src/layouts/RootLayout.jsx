import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { CartOverlay } from '@/components/Cart';
import { Providers } from '@/layouts';

function RootLayout() {
    return (
        <Providers>
            <Header />
            <CartOverlay />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </Providers>
    );
}

export default RootLayout;
