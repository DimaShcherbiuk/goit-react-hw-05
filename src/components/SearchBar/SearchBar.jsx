import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <input
        type="text"
        name="movieName"
        placeholder="Enter the title to search"
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
