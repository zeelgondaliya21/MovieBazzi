import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/singleMovieBody.css";
import movieServices from "../../services/moviesServices";

function SingleMovieTrailer(props) {
  const [trailers, setTrailers] = useState([]);
  // const componentMounted = useRef(true);

  const getTrailers = async () => {
    const { data } = await movieServices.getTrailerDetails(
      "movie",
      props.movieID
    );
    const { results } = data;
    const t = [...results];
    setTrailers(t);
  };

  useEffect(() => {
    getTrailers();
  });

  // useEffect(() => {
  //   if (componentMounted.current) {
  //     getTrailers();
  //   }
  //   return () => {
  //     componentMounted.current = false;
  //   };
  // });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 3, // optional, default to 1.
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
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
      >
        {trailers.slice(0, 3).map((movie, i) => {
          const ytLink = "https://www.youtube-nocookie.com/embed/" + movie.key;
          return (
            <div className="recom-slider" key={i}>
              {i < 5 && (
                <iframe
                  className="recomendations-slider-img"
                  src={ytLink}
                  title={movie.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen="allowfullscreen"
                ></iframe>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default SingleMovieTrailer;
