import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@material-tailwind/react';

const Pagination = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const [active, setActive] = useState(page);

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const next = () => {
    if (active === pages) return;
    setActive(active + 1);
  };

  const generatePageNumbers = () => {
    let pageNumbers = [];

    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else if (active <= 2) {
      pageNumbers = [1, 2, 3, '...', pages];
    } else if (active > pages - 3) {
      pageNumbers = [1, '...', pages - 3, pages - 2, pages - 1, pages];
    } else {
      pageNumbers = [1, '...', active - 1, active, active + 1, '...', pages];
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    pages > 1 && (
      <div className="flex items-center justify-center">
        <Link
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${active - 1}`
                : `/page/${active - 1}`
              : `/admin/adminpage/${active - 1}`
          }
          className=""
        >
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full dark:text-white"
            onClick={prev}
            disabled={active === 1}
          >
            {' '}
            Previous
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber, index) => (
            <Link
              key={index}
              to={
                pageNumber !== '...'
                  ? !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${pageNumber}`
                      : `/page/${pageNumber}`
                    : `/admin/adminpage/${pageNumber}`
                  : '#'
              }
              className="w-8"
            >
              <IconButton
                variant={active === pageNumber ? 'filled' : 'text'}
                color="gray"
                onClick={() => setActive(pageNumber)}
                className="rounded-full text-[1rem] dark:text-white"
              >
                {pageNumber}
              </IconButton>
            </Link>
          ))}
        </div>
        <Link
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${active + 1}`
                : `/page/${active - 1}`
              : `/admin/adminpage/${active + 1}`
          }
        >
          <Button
            variant="text"
            className="flex items-center rounded-full dark:text-white"
            onClick={next}
            disabled={active === pages}
          >
            Next
          </Button>
        </Link>
      </div>
    )
  );
};

export default Pagination;
