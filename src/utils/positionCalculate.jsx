const positionCalculate = (node) => {
  const { width, height, x, y } = node.getBoundingClientRect();
  return {
    x: x / 4.5,
    y: y,
    r: width + 10,
    t: height,
  };
};

export default positionCalculate;
