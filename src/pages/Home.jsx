import React, { useEffect, useState } from "react";
import { GifState } from "../context/Gif-Context";
import Gifs from "../components/Gifs";
import FilterGifs from "../components/FilterGifs";

const Home = () => {
  const { gf, gif, setGifs, filter, setFilter } = GifState();
  const [loading, setLoading] = useState(false);

  const fetchTrendingGifs = async () => {
    try {
      setLoading(true);
      const result = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g",
      });
      // console.log(`trending`, result.data);
      setGifs(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`trending`, error);
    }
  };
  // console.log(gif, 21);

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);
  return (
    <div className="px-6 mx-auto">
      <img src="/banner.gif" alt="img" className="w-full rounded mb-3 h-16 " />

      <FilterGifs showTrending={true} />
      {loading && <h1>LOading....</h1>}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gif?.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
