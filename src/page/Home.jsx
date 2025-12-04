import React from 'react';
import Slider from '../component/Slider';
import CategoryFilteredPage from './CategoryFilteredPage';
import CategorySection from '../component/CategorySection';
import WhyAdoptSection from '../component/WhyAdoptSection';
import RecentList from '../component/RecentList';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <RecentList></RecentList>
            <WhyAdoptSection></WhyAdoptSection>

        </div>
    );
};

export default Home;