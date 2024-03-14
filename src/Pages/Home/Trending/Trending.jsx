import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import "../style.scss"
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs';
import useFetch from '../../../Hooks/UseFetch';
import Carousel from '../../../Components/Carousel/Carousel';

function Trending() {

    const [endPoint, setEndPoint] = useState("day")

    const{ data, loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange = (tab) => {
        setEndPoint( tab === 'Day' ? "day" : "week")
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Trending