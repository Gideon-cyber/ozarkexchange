import React from "react";

type Props = {
  coinsPerPage: number;
  totalCoins: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination = ({
  coinsPerPage,
  totalCoins,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-[2rem] px-[1.5rem]">
      <div className="mb-4">
        <p className="text-sm text-nearWhite">
          Showing
          <span className="font-medium text-primYellow">
            {" "}
            {currentPage * coinsPerPage - coinsPerPage}{" "}
          </span>
          to
          <span className="font-medium text-primYellow">
            {" "}
            {currentPage * coinsPerPage}{" "}
          </span>
          of
          <span className="font-medium text-primYellow"> {totalCoins} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            {pageNumbers.map((number) => (
              <a
                key={number}
                onClick={() => {
                  paginate(number);
                }}
                href="#"
                className={`${
                  currentPage === number
                    ? "text-primYellow border-primtext-primYellow"
                    : "text-nearWhite border-nearWhite"
                } border hover:bg-whitePrim hover:text-blackPrim items-center relative inline-flex px-4 py-2 text-sm font-medium`}
              >
                {number}
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
