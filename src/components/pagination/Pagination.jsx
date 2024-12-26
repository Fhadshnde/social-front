import "./pagination.css";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <div className="page previous" onClick={handlePrevious}>Previous</div>
      {[...Array(pages).keys()].map((page) => (
        <div
          className={`page ${page + 1 === currentPage ? "active" : ""}`}
          key={page + 1}
          onClick={() => setCurrentPage(page + 1)}
        >
          {page + 1}
        </div>
      ))}
      <div className="page next" onClick={handleNext}>Next</div>
    </div>
  );
};

export default Pagination;
