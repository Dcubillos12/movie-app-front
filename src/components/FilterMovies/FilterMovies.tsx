import Gener from "@/app/types/gener";

function FilterMovies({
  title,
  genres,
  onGenreSelect,
}: {
  title: string;
  genres: Gener[];
  onGenreSelect: (genreId: number) => void;
}): JSX.Element {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenreId = parseInt(event.target.value);
    onGenreSelect(selectedGenreId);
  };

  return (
    <>
      <h1 className="text-light fs-4">{title}</h1>
      <div className="input-group mb-3">
        <select
          className="form-select"
          id="inputGroupSelect01"
          onChange={handleSelectChange}
          defaultValue="0"
        >
          <option value="0" selected>
            Choose...
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FilterMovies;
