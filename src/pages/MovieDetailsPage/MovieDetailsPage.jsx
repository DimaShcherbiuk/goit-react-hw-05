import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { fetchMovieDetails } from "../../service/movie-api";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

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

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from || "/");

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        notify();
        console.log(error);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetails;
  const scoreToFixed = Number(vote_average).toFixed(2);

  return (
    <main className="container">
      <div className={css.detailsPage}>
        <Link to={backLinkHref.current} className={css.goBackLink}>
          <GoArrowLeft className={css.icon} />
          Go back
        </Link>
        <div className={css.movieInfo}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : `http://www.suryalaya.org/images/no_image.jpg`
            }
            loading="lazy"
            alt="Movie poster"
            className={css.img}
          />
          <div>
            <h1>{original_title}</h1>
            <p>User score: {scoreToFixed}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul className={css.genreList}>
              {genres &&
                genres.length &&
                genres.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
          </div>
        </div>
        <div className={css.addInfo}>
          <h3 className={css.addInfoTitle}>Additional information</h3>
          <ul className={css.infoList}>
            <li className={css.infoItem}>
              <Link
                to="cast"
                state={{ ...location.state }}
                className={css.infoLink}
              >
                Cast
              </Link>
            </li>
            <li className={css.infoItem}>
              {" "}
              <Link
                to="reviews"
                state={{ ...location.state }}
                className={css.infoLink}
              >
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default MovieDetailsPage;
