import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/singleMovieBody.css";
import { Link } from "react-router-dom";
import movieServices from "../../services/moviesServices";

function SingleTVRecommendation(props) {
  const [recommTV, setRecommTV] = useState([]);

  const getRecommendedTV = async () => {
    const { data } = await movieServices.getRecommendationDetails(
      "tv",
      props.tvID
    );
    const { results } = data;
    const temp = [...results];
    setRecommTV(temp);
  };

  useEffect(() => {
    getRecommendedTV();
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
      >
        {recommTV.slice(0, 10).map((tv) => {
          const imgURL = "https://image.tmdb.org/t/p/w300" + tv.poster_path;
          const redirectSingleTVURL = "/tvshows/" + tv.id;
          return (
            <div className="recom-slider" key={tv.id}>
              <Link to={redirectSingleTVURL}>
                <img
                  className="recomendations-slider-img"
                  src={imgURL}
                  alt={tv.name}
                />
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default SingleTVRecommendation;
