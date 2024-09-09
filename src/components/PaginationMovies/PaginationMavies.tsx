const PaginationMovies = ({
  num,
  onPageChange,
}: {
  num: number;
  onPageChange: (newPage: number) => void;
}): JSX.Element => {
  const handlePrevious = () => {
    if (num > 1) {
      onPageChange(num - 1);
    }
  };

  const handleNext = () => {
    onPageChange(num + 1);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${num === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevious}
            disabled={num === 1}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">{num}</span>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationMovies;
