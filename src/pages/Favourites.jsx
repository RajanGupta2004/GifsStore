import React, { useEffect, useState } from "react";
import { GifState } from "../context/Gif-Context";
import Gifs from "../components/Gifs";

const Favourites = () => {
  const [favouriteGifs, setFavourites] = useState([]);
  const { gf, favourite } = GifState();

  const fetchFavouriteGifs = async () => {
    try {
      const { data } = await gf.gifs(favourite);
      setFavourites(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(favouriteGifs);
  useEffect(() => {
    fetchFavouriteGifs();
  }, []);
  // console.log(favourite);
  return (
    <>
      <h3 className="text-3xl font-bold m-5">Favourite Gifs</h3>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {favouriteGifs?.map((gif) => (
          <Gifs gif={gif} key={gif.id} />
        ))}
      </div>
    </>
  );
};

export default Favourites;
