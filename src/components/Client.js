import React from "react";
import Avatar from "react-avatar";

const Client = ({ username }) => {
  return (
    <div className="client">
      <Avatar name={username} size={25} round="14px" />
    </div>
  );
};

export default Client;
