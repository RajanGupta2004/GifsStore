import React, { useEffect, useState } from "react";
import { GifState } from "../context/Gif-Context";
import { useParams } from "react-router-dom";
import Gifs from "../components/Gifs";
import FollowOn from "../components/FollowOn";

const Category = () => {
  const [results, setResults] = useState([]);
  const { category } = useParams();
  // console.log(category);

  const { gf } = GifState();

  const fetchCategotyResults = async () => {
    try {
      const { data } = await gf.gifs(category, category);
      // console.log(data);
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategotyResults();
  }, [category]);
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results?.length > 0 && <Gifs gif={results[0]} hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          DON&apos;t tell to me , Gifs ite to me
        </span>
        <FollowOn />
      </div>
      <div>
        <h2 className="capitalize text-2xl font-extrabold my-4">
          {category} Gifs
        </h2>

        <h4 className="text-xl text-gray-200 my-3">@{category}</h4>
        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {results.slice(1).map((gif) => (
              <Gifs gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
