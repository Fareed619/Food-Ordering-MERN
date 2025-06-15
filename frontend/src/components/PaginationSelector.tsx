import ReactPaginate from "react-paginate";
type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};
const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-fit mx-auto mt-7">
      {" "}
      {pages !== 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            page === pageNumber.length || pageNumber.length === 0 ? null : (
              <span className="px-2 py-1">→</span>
            )
          }
          previousLabel={page > 1 ? <span className="px-2 py-1">←</span> : null}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pages}
          forcePage={page - 1}
          containerClassName="flex justify-center gap-2 text-sm"
          pageClassName="px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer"
          activeClassName="bg-orange-500 text-white"
          previousClassName={`px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer ${
            page === 1 ? "hidden" : ""
          }`}
          nextClassName={`px-3 py-1 border rounded hover:bg-blue-100 cursor-pointer ${
            page === pageNumber.length || pageNumber.length === 0 ? "hidden" : ""
          }`}
          breakClassName="px-3 py-1"
        />
      )}
    </div>
  );
};

export default PaginationSelector;
