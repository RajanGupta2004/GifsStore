import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GifState } from "../context/Gif-Context";
import SearchGifs from "./SearchGifs";

const Header = () => {
  const [category, setCategory] = useState([]);
  const [showcategory, setShowCategory] = useState(false);
  const { gf, favourite } = GifState();

  const fetchGifCategoty = async () => {
    const { data } = await gf.categories();
    setCategory(data);
  };
  useEffect(() => {
    fetchGifCategoty();
  }, []);

  // console.log(category);
  return (
    <>
      <nav>
        <div className=" relative flex justify-between gap-4 items-center mb-2">
          <Link to="/" className="flex gap-2 mx-4 ">
            <img src="/logo.svg" alt="logo" className="w-8" />
            <h1 className="font-bold text-2xl cursor-pointer">GIPHY</h1>
          </Link>

          <div className="flex gap-5">
            {category?.slice(0, 5).map((category) => {
              return (
                <Link
                  to={`/${category.name_encoded}`}
                  key={category.name_encoded}
                  className="px-4 py-1  hover:bg-orange-300 hover:text-black hidden lg:block"
                >
                  {category.name_encoded}
                </Link>
              );
            })}

            <button
              className="cursor-pointer text-2xl hidden lg:block"
              onClick={() => setShowCategory(!showcategory)}
            >
              <HiDotsVertical />
            </button>

            <div>
              {favourite.length > 0 && (
                <Link
                  to="/favourite"
                  className="bg-slate-400 px-2 py-1 hidden lg:block rounded-md"
                >
                  Favourite GIF
                </Link>
              )}
            </div>

            <div>
              <HiOutlineMenuAlt3 className="text-2xl block lg:hidden" />
            </div>
          </div>
          {showcategory && (
            <div className="absolute  top-12 px-6 py-4 rounded-md w-full right-0 z-20 bg-red-400">
              <span className="font-bold text-2xl">Category</span>
              <hr className="my-3" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category?.map((category) => (
                  <Link
                    to={`/${category.name_encoded}`}
                    className="font-bold"
                    key={category.name_encoded}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <SearchGifs />
      </nav>
    </>
  );
};

export default Header;
