import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <input
        type="text"
        name="movieName"
        placeholder="Search for movies..."
        autoComplete="off"
        autoFocus
        required
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
