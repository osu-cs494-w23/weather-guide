import React, { useState  } from 'react';
import MainPage from "../MainPage/MainPage";
import Menu from "../MainPage/Menu/Menu";
import Footer from "../MainPage/Footer/Footer";


const PageWrapper = () =>{

    return(
        <>
            <Menu></Menu>
            <MainPage></MainPage>
            <Footer></Footer>
        </>
    )
}

export default PageWrapper