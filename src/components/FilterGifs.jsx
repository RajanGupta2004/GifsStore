import React from "react";
import { GifState } from "../context/Gif-Context";
import { FaArrowTrendUp } from "react-icons/fa6";

const FilterGifs = ({ showTrending = false }) => {
  const filters = [
    {
      title: "GIFs",
      value: "gifs",
      background:
        "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
      title: "Stickers",
      value: "stickers",
      background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
      title: "Text",
      value: "text",
      background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
  ];
  const { filter, setFilter } = GifState();
  // console.log(filter);
  return (
    <div className="flex  justify-between">
      {showTrending && (
        <span className="flex gap-2 items-center my-2">
          {showTrending && (
            <FaArrowTrendUp className="text-red-600 w-8 font-bold" />
          )}
          <span className="font-bold">Trending</span>
        </span>
      )}

      <div>
        {filters.map((item) => {
          return (
            <span
              onClick={() => setFilter(item.value)}
              key={item.title}
              className={` ${
                filter === item.value ? item.background : ""
              }    :"" font-bold px-3 text-center rounded-full cursor-pointer`}
            >
              {item.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGifs;
