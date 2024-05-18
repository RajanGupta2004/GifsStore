import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/Gif-Context";
import Gifs from "../components/Gifs";
import FollowOn from "../components/FollowOn";
import { FaHeart } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";
import { IoCode } from "react-icons/io5";

const SingleGif = () => {
  const { type, slug } = useParams();

  console.log(type, slug);
  const [gif, setGifs] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, setFavourite, favourite, addToFavorite } = GifState();

  const fetchGifs = async () => {
    try {
      const gifId = slug.split("-");

      const { data } = await gf.gif(gifId[gifId.length - 1]);
      const { data: related } = await gf.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setRelatedGifs(related);
      setGifs(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(gif);
  // console.log(relatedGifs);

  useEffect(() => {
    fetchGifs();
  }, []);
  return (
    <>
      <div className="grid grid-cols-4 my-10 gap-4 ">
        <div className="hidden sm:block">
          {gif?.user && (
            <div className="flex gap-1">
              <img
                className="h-14"
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="text-gray-300">@{gif?.user?.username}</div>

                {gif?.user?.description && (
                  <p className="py-4 whitespace-pre-line text-sm text-gray-300">
                    {readMore
                      ? gif?.user?.description
                      : gif?.user?.description.slice(0, 100) + "..."}
                  </p>
                )}
              </div>
            </div>
          )}

          <FollowOn />
        </div>

        <div className="col-span-4 sm:col-span-3">
          <div className="flex gap-6">
            <div className="w-full sm:w-3/4">
              <div className="font-bold text-2xl mb-2">{gif.title}</div>
              <Gifs gif={gif} hover={false} />
              {/* mobileui */}
            </div>
            <div className="flex flex-col gap-4">
              <div
                onClick={() => addToFavorite(gif.id)}
                className="flex  gap-3 items-center cursor-pointer  "
              >
                <FaHeart
                  size={22}
                  className={favourite.includes(gif.id) ? "text-red-700" : ""}
                />{" "}
                <span>favourite</span>
              </div>
              <div className="flex  gap-3 items-center  cursor-pointer">
                <FaPaperPlane size={22} /> <span>share</span>
              </div>
              <div className="flex  gap-3 items-center cursor-pointer">
                <IoCode size={22} /> <span>embed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-2xl  font-bold mb-4 p-4">Related GIfs</span>
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {relatedGifs?.map((gif) => (
            <Gifs gif={gif} hover={false} key={gif.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleGif;
