import { Link } from "react-router-dom";

export default function MovieList({ movies, location }) {
  return (
    <ul>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
