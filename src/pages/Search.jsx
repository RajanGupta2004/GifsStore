import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-Context";
import Gifs from "../components/Gifs";
import FilterGifs from "../components/FilterGifs";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const { gf, filter } = GifState();
  // console.log(query);
  const fecchSearchResults = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "es",
        limit: 20,
        type: filter,
      });
      // console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecchSearchResults();
  }, [filter, query]);

  return (
    <div className="mb-4">
      <h4 className="text-2xl font-bold p-3 ">{query}</h4>
      <FilterGifs />

      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-4">
          {searchResults?.map((gif) => (
            <Gifs gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        "Item Are Not founds"
      )}
    </div>
  );
};

export default Search;
