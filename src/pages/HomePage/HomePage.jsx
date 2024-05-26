import { useLocation } from "react-router-dom";
import { fetchMoviesTrend } from "../../service/movie-api";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";

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

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getMoviesTrend() {
      setLoading(true);
      try {
        const data = await fetchMoviesTrend();
        setTrendMovies(data.results);
      } catch (error) {
        notify(error);
      } finally {
        setLoading(false);
      }
    }
    getMoviesTrend();
  }, []);

  return (
    <div className="container">
      <div className={css.homePage}>
        <h1>Trending Today</h1>
        <ul className={css.movieList}>
          <MovieList location={location} movies={trendMovies} />{" "}
          {loading && <Loader />}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
