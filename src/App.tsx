import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";
import Main from "./pages/Main";
import ControlMenuBar from "./components/ControlMenuBar";
const App = () => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const contentRef = useRef<HTMLDivElement>(null);
  const targetElementRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    //렌더링시 스크롤 특정위치로 이동
    window.scrollTo(1250, 700);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current && targetElementRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const targetRect = targetElementRef.current.getBoundingClientRect();

      setOrigin({
        x: targetRect.left - contentRect.left,
        y: targetRect.top - contentRect.top,
      });
    }
  }, []);

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) return;

    const handleWheel = (event: WheelEvent) => {
      if (!isCtrlPressed) return;

      event.preventDefault();

      const delta = Math.sign(event.deltaY) * -0.1;
      let newScale = scale + delta;
      newScale = Math.min(Math.max(0.5, newScale), 3);

      const rect = contentElement.getBoundingClientRect();

      // 마우스 포인터의 좌표 계산
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 새로운 origin 계산 (마우스 포인터를 기준으로 한 좌표)
      const scaleRatio = newScale / scale;
      const newOriginX = mouseX - mouseX * scaleRatio;
      const newOriginY = mouseY - mouseY * scaleRatio;

      setScale(newScale);
      setOrigin((prevOrigin) => ({
        x: prevOrigin.x + newOriginX,
        y: prevOrigin.y + newOriginY,
      }));
    };

    contentElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      contentElement.removeEventListener("wheel", handleWheel);
    };
  }, [isCtrlPressed, scale]);

  console.log(scale);
  return (
    <>
      <GlobalStyle />
      <ControlMenuBar scale={scale} setScale={setScale} />
      <div
        id="container"
        style={{
          width: "4000px",
          height: "3000px",
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
          ref={contentRef}
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            ref={targetElementRef}
            style={{ position: "relative", width: "100%" }}
          >
            <Main />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
