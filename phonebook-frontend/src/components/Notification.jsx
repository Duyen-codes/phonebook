import React from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={message.type === "info" ? "message" : "error"}>
      {message.content}
    </div>
  );
};

export default Notification;
