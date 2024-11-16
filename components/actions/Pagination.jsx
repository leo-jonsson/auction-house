// PaginationControls.jsx
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationControls = ({
  page,
  totalPages,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-between items-center my-10 px-3">
      <Button variant="ghost" onClick={handlePrevPage} disabled={page === 1}>
        <ArrowLeft />
        Prev
      </Button>
      <span className="text-muted-foreground">
        <span className="text-foreground">{page}</span> / {totalPages}
      </span>
      <Button
        variant="ghost"
        onClick={handleNextPage}
        disabled={page >= totalPages}
      >
        Next
        <ArrowRight />
      </Button>
    </div>
  );
};

export default PaginationControls;
