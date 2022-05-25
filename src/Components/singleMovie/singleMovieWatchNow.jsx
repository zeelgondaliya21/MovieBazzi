import React, { useEffect, useState } from "react";
import movieServices from "../../services/moviesServices";

function SingleMovieWatchNow(props) {
  const [streamList, setStreamList] = useState([]);
  const [streamLink, setStreamLink] = useState("");
  // const componentMounted = useRef(true);

  const getStreamList = async () => {
    const { data } = await movieServices.getWatchProviderDetails(
      "movie",
      props.movieID
    );
    const { results } = data;

    if (results.IN && results.IN.flatrate) {
      const list = [...results.IN.flatrate];
      setStreamList([...list]);
    }
    if (results.IN && results.IN.link) {
      const link = results.IN.link;
      setStreamLink(link);
    }
  };

  useEffect(() => {
    getStreamList();
  });

  return (
    <div>
      {streamList.map((s, i) => {
        const imgURL = "http://image.tmdb.org/t/p/w92" + s.logo_path;
        return (
          <a key={i} href={streamLink} target="_blank" rel="noreferrer">
            <img src={imgURL} alt={s.provider_name} />
          </a>
        );
      })}
    </div>
  );
}

export default SingleMovieWatchNow;
