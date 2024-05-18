import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchGifs = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const SeachGifs = () => {
    if (query.trim() == "") {
      return;
    }
    navigate(`/search/${query}`);
  };
  return (
    <div className="flex relative">
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search Gifs and Stickers...."
        className="w-full text-black h-16 p-4 text-2xl outline-none rounded-tl rounded-bl mx-6 my-2
      "
      />

      {query && (
        <MdOutlineCancel
          onClick={() => setQuery("")}
          size={26}
          className=" cursor-pointer  absolute top-8 right-24 rounded text-black  "
        />
      )}
      <button
        onClick={SeachGifs}
        className="absolute bg-red-600 text-2xl  cursor-pointer my-2 p-4 right-6 h-16 top-0"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchGifs;
