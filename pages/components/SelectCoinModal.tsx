import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Coins from "./Coins";
import Pagination from "./Pagination";
import { Coin } from "../../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  FeaturedCoins: Coin[];
  showCoinsModal: boolean;
  setShowCoinsModal: Dispatch<SetStateAction<boolean>>;
};

const SelectCoinModal = ({
  FeaturedCoins,
  setShowCoinsModal,
  showCoinsModal,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(100);

  const indexOfLastPost = currentPage * coinsPerPage;
  const indexOfFirstPost = indexOfLastPost - coinsPerPage;
  const currentFeaturedCoins = FeaturedCoins.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const [searchField, setSearchField] = useState("");

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //Filtered coins on search
  const filteredCoins = currentFeaturedCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="h-screen w-full fixed top-0 bottom-0 bg-blackPrim z-[500] flex items-center flex-col">
      {/*header section*/}
      <div className="w-full flex items-center flex-col px-[1.5rem] py-[1rem] border-b border-b-blackTert">
        <div className="flex items-center justify-between w-full">
          <h4 className="text-[1.25rem] font-b-500 font-Titillium">
            SELECT A COIN/TOKEN
          </h4>
          {/*icon*/}
          <div
            className="text-[24px] cursor-pointer"
            onClick={() => setShowCoinsModal(!showCoinsModal)}
          >
            <Icon icon="ic:outline-close" />
          </div>
        </div>
        {/*Search field*/}
        <div className="w-full relative mt-[1rem]">
          <input
            type="search"
            value={searchField}
            className="px-[1.7rem] py-[0.5rem] bg-[#333333] border-[2px] border-blackTert outline-none w-full text-whitePrim placeholder:text-nearWhite rounded-[4px] text-[21px] font-b-500 font-Titillium indent-[1.5rem]"
            placeholder="SEARCH FOR A COIN/TOKEN"
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
          />
          {/*search icon*/}
          <div className="absolute top-[0.68rem] left-[0.8rem] text-[31px]">
            <Icon icon="bx:search" />
          </div>
        </div>
      </div>

      {/*Body section*/}
      <div className="w-full h-[calc(94%-5rem)] py-[1rem] overflow-x-hidden overflow-y-scroll bg-blackPrim lg:scrollbar-track-blackPrim lg:scrollbar-thumb-blackTert  lg:scrollbar-thumb-rounded-xl lg:scrollbar-thin">
        {/*Featured coins*/}
        <Coins Coins={filteredCoins} />
        <Pagination
          coinsPerPage={coinsPerPage}
          totalCoins={FeaturedCoins.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default SelectCoinModal;
