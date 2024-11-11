const centerScroll = (element: HTMLElement) => {
  const scrollLeft = (element.scrollWidth - window.innerWidth) / 2;
  // const scrollTop = (element.scrollHeight - window.innerHeight) / 2;
  window.scrollTo(scrollLeft, 700);
};

export default centerScroll;
