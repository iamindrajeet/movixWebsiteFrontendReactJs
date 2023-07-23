import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguation, getGenres } from "./store/homeSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import Explore from "./pages/explore/Explore";

function App() {
  //const url = useSelector((state) => state.home.url);
  //console.log(url);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfiguration();
    genresCall();
  }, []);

  const fetchApiConfiguration = () => {
    fetchDataFromApi("/configuration")
      .then((response) => {
        //console.log(response);

        const url = {
          backdrop: response.images.secure_base_url + "original",
          poster: response.images.secure_base_url + "original",
          profile: response.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguation(url));
      })
      .catch((error) => console.log(error));
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];

    let allGenres = {};

    for(const url of endPoints){
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    }

    const data = await Promise.all(promises)
    //console.log(data);
    data.map(({genres}) => {
      //  console.log(genres)
      return genres.map(item => (allGenres[item.id] = item))
    })
    //console.log(allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
