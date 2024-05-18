import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const FollowOn = () => {
  return (
    <div>
      <h3 className="text-xl font-bold "> Follow on </h3>
      <div className="flex gap-4 text-2xl cursor-pointer my-4">
        <FaInstagram />
        <FaXTwitter />
        <FaGithub />
      </div>
      <hr />
    </div>
  );
};

export default FollowOn;
