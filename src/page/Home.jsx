import React from 'react';
import Slider from '../component/Slider';
import CategoryFilteredPage from './CategoryFilteredPage';
import CategorySection from '../component/CategorySection';
import WhyAdoptSection from '../component/WhyAdoptSection';
import RecentList from '../component/RecentList';
import TestimonialSlider from '../component/TestimonialSlider';
import FAQ from '../component/FAQ';
import ImpactNumbers from '../component/ImpactNumbers';
import FeaturesSection from '../component/FeaturesSection';
import CTASection from '../component/CTASection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <RecentList></RecentList>
            <WhyAdoptSection></WhyAdoptSection>
            <FeaturesSection></FeaturesSection>
            <TestimonialSlider></TestimonialSlider>
            <ImpactNumbers></ImpactNumbers>
            <FAQ></FAQ>
            <CTASection></CTASection>

        </div>
    );
};

export default Home;