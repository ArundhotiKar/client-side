import React from 'react';
import Slider from '../component/Slider';
import CategoryFilteredPage from './CategoryFilteredPage';
import CategorySection from '../component/CategorySection';
import WhyAdoptSection from '../component/WhyAdoptSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <WhyAdoptSection></WhyAdoptSection>
        </div>
    );
};

export default Home;