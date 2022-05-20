import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import env from "react-dotenv";

import Header from './components/header';
import Footer from './components/footer';
import DashboardPage from './pages/dashboard';
import BuyBoxPage from './pages/buyBox';
import BuyHeroPage from './pages/buyHero';
import BuyPage from './pages/buy';
import FourZeroFourPage from './pages/fourZeroFourPage'
import LoadingAnimation from './components/loadingAnimation';

function App() {
    if(env === undefined){
        window.location = "/";
    }
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if(isLoading){
        return <LoadingAnimation />
    }

    return !isLoading && <>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path={env.URL_BUYBOX_PAGE} element={<BuyBoxPage />}>
                    <Route path="*" element={<BuyBoxPage />} />
                </Route>
                <Route path={env.URL_BUY_PAGE} element={<BuyPage />} />
                <Route path={env.URL_BUYHERO_PAGE} element={<BuyHeroPage />}>
                    <Route path="*" element={<BuyHeroPage />} />
                </Route>
                <Route exact path="*" element={<FourZeroFourPage />} />
            </Routes>
            <Footer />
        </Router>
    </>
}

export default App;
