import React from "react";

const notificationStyle = {
  color: "green",
  backGround: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderWidth: "3px",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }
  let usedStyle = {};
  if (type === "success") {
    usedStyle = { ...notificationStyle, color: "green" };
  } else if (type === "error") {
    usedStyle = { ...notificationStyle, color: "red" };
  }
  if (usedStyle) {
    return <div style={usedStyle}>{message}</div>;
  }
  return null;
};

export default Notification;
