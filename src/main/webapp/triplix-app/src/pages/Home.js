/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import NavBar from './NavBar/NavBar';
import Banner from './Banner/Banner';
import PickBar from './PickBar/PickBar';
import MainArea from './MainArea/MainArea';


export default () => {
    return (
        <>
            <Banner />

            <PickBar />

            <MainArea />
        </>
    );
};
