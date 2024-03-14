import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { fetchDataFromAPI } from './Utils/Api'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from './Store/HomeSlice'

import Home from "./Pages/Home/Home"
import PageDetails from "./Pages/PageDetails/PageDetails"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import PageNotFound from "./Pages/404/404"
import Explore from "./Pages/Explore/Explore"
import SearchResults from "./Pages/SearchResult/SearchResult"

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromAPI('/configuration')
      .then((res => {
        console.log(res, "result");

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfigurations(url));
      }))
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/:mediaType/:id' element={<Details />} /> */}
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
