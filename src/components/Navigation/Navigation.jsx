import { NavLink, Outlet } from "react-router-dom";
import css from "./Navigation.module.css";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import clsx from "clsx";

const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className="container">
      <nav className={css.nav}>
        <NavLink to="/" end className={getLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getLinkClass}>
          Movies
        </NavLink>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </nav>
    </header>
  );
}
