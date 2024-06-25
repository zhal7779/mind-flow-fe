import React from "react";

const Line = ({ from, to }) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={from.left}
        y1={from.top}
        x2={to.left}
        y2={to.top}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Line;
