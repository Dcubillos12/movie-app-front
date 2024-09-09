function SearchMovies({
  title,
  icon,
  placeholder,
  onChange,
  onClick,
}: {
  title: string;
  icon: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}): JSX.Element {
  return (
    <>
      <div>
        <h1 className="text-light fs-4">{title}</h1>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
          />
          <button
            onClick={onClick}
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            {icon}
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchMovies;
