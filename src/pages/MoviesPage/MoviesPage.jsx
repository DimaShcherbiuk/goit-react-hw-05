import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchMoviesSearch } from "../../service/movie-api";
import toast from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

const notify = (msg) =>
  toast.error(`${msg}`, {
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

const MoviesPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieName === "") {
      notify("Please, enter the keyword!");
      return;
    }
    setMoviesList([]);
    const getMovieByKeyword = async (movieName) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMoviesSearch(movieName);
        if (!data.results.length) {
          throw new Error(
            "There are no movies with this request. Please, try again."
          );
        }
        setMoviesList(data.results);
      } catch (error) {
        setError(error.message);
        notify(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    const newMovieName = searchForm.elements.movieName.value.trim();

    if (newMovieName === "") {
      notify("Please, enter the keyword!");
      return;
    }

    setSearchParams({ movieName: newMovieName });
    searchForm.reset();
  };

  return (
    <div className="container">
      <div className={css.moviesPage}>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p className={css.errorMessage}>{error}</p>}
        <MovieList movies={moviesList} location={location} />
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default MoviesPage;
