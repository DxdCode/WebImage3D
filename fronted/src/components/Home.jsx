import Navbar from './Home/Navbar';
import Hero from './Home/Hero';
import WhatWeDo from './Home/WhatWeDo';
import Footer from './Home/Footer';

const Home = () => {
    return (
        <div className="min-h-screen w-full bg-green-900 dark:bg-gray-900 text-white dark:text-gray-100">
            <Navbar />
            <Hero />
            <WhatWeDo />
            <Footer />
        </div>
    );
};

export default Home;
