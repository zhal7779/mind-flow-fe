const positionCalculate = (node: HTMLElement) => {
  const { width, height, x, y } = node.getBoundingClientRect();

  return {
    x: x / 4.5,
    y: y + height / 2,
    r: width + 10,
    t: height,
  };
};

export default positionCalculate;
