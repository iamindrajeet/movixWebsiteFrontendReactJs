import React, { useState, useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    const randomBackdrop = data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    const bg = (url?.backdrop && randomBackdrop)
      ? `${url.backdrop}${randomBackdrop}`
      : "https://image.tmdb.org/t/p/original/xGIeqQunSj5dxGZVKzNNr9W4vps.jpg";
    
    setBackground(bg);
  }, [data, url]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchHandler = (event) => {
    navigate(`/search/${query}`);
  }

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer">

      </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show..."
              className="text"
              onKeyUp={searchQueryHandler}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button onClick={searchHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
