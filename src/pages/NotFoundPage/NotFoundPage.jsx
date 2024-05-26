import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container">
      <p>
        ERROR 404 - Sorry, page not found! Please go to{" "}
        <Link to="/">
          <b>Home page</b>
        </Link>
        !
      </p>
    </div>
  );
};

export default NotFoundPage;
