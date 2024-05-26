import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { fetchMovieReviews } from "../../service/movie-api";
import css from "./MovieReviews.module.css";
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

const MovieReviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getMovieReviews = async (movieId) => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviewsList(data.results);
      } catch (error) {
        notify(error);
      }
    };
    getMovieReviews(movieId);
  }, [movieId]);

  return (
    <main className="container">
      <ul>
        {reviewsList.length > 0 ? (
          reviewsList.map(({ author, content, id }) => (
            <li key={id} className={css.item}>
              <p className={css.name}>
                <FaUserCircle className={css.icon} />
                {author}
              </p>
              <p className={css.content}>{content}</p>
            </li>
          ))
        ) : (
          <p>We do not have any reviews for this movie yet</p>
        )}
      </ul>
    </main>
  );
};

export default MovieReviews;
