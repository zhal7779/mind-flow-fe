import React, { useEffect, useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Main from "./pages/Main";

const App = () => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isCtrlPressed) return;

    event.preventDefault();
    const delta = Math.sign(event.deltaY) * -0.1;
    let newScale = scale + delta;
    newScale = Math.min(Math.max(0.5, newScale), 3);

    const rect = document.getElementById("content").getBoundingClientRect();
    const originX = event.clientX - rect.left;
    const originY = event.clientY - rect.top;

    setScale(newScale);
    setOrigin({ x: originX, y: originY });
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsDragging(true);
    setStart({
      x: event.clientX - origin.x,
      y: event.clientY - origin.y,
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging) {
      setOrigin({
        x: event.clientX - start.x,
        y: event.clientY - start.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <GlobalStyle />
      <div
        id="container"
        style={{
          width: "5000px",
          height: "5000px",
          backgroundColor: "var(--color-bg)",
          transformOrigin: "0 0",
          transform: `translate(${origin.x}px, ${origin.y}px) scale(${scale})`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div
          id="content"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            width: "100vw",
            height: "100vh",

            position: "relative",
          }}
        >
          <div style={{ overflowY: "scroll" }}>
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
