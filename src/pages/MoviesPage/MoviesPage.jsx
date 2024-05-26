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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieName === "") {
      notify("Please, enter the keyword!");
      return;
    }
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyword = async (movieName) => {
      setLoading(true);
      try {
        await fetchMoviesSearch(movieName).then((data) => {
          if (!data.results.length) {
            setLoading(false);
            setError(true);
            return notify(
              "There is no movies with this request. Please, try again"
            );
          }
          setError(false);
          setMoviesList(data.results);
          setLoading(false);
        });
      } catch (error) {
        notify("Something went wrong. Please, try again!");
      }
    };
    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };

  return (
    <div className="container">
      <div className={css.moviesPage}>
        <SearchBar onSubmit={handleSubmit} />
        {error && (
          <p>There is no movies with this request. Please, try again</p>
        )}
        <MovieList movies={moviesList} location={location} />
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default MoviesPage;
