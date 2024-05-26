import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../service/movie-api";
import css from "./MovieCast.module.css";
import toast from "react-hot-toast";

const notify = () =>
  toast.error("Something went wrong. Please, try again!", {
    style: {
      border: "1px solid #000000",
      padding: "16px",
      color: "#000000",
    },
    iconTheme: {
      primary: "#000000",
      secondary: "#f5f5f5",
    },
  });

const MovieCast = () => {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCast = async (movieId) => {
      try {
        const data = await fetchMovieCast(movieId);
        setCastList(data.cast);
      } catch (error) {
        notify();
      }
    };
    getMovieCast(movieId);
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {castList.length > 0
        ? castList.map(({ id, name, profile_path, character }) => (
            <li key={id} className={css.listItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : `http://www.suryalaya.org/images/no_image.jpg`
                }
                alt="actor"
                loading="lazy"
                width="120"
              />
              <h3 className={css.name}>{name}</h3>
              <p className={css.character}> Character: {character}</p>
            </li>
          ))
        : "Sorry, there isn't any info :("}
    </ul>
  );
};

export default MovieCast;
