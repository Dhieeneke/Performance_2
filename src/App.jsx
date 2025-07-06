import React, { Suspense } from 'react';
import { Header } from './components/Header.jsx';

// Lazy loading для Main компонента
const Main = React.lazy(() => import('./components/Main.jsx').then(module => ({ default: module.Main })));

export function App() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Загрузка...</div>}>
                <Main />
            </Suspense>
        </>
    );
} 