export const fillSvgElemColorWithInterval = (target, intervalTime = 0, transitionDelayAttr) => {
  if (!target.children) return undefined;

  const transitionDelay = transitionDelayAttr ?? intervalTime;
  const pathElems = Array.from(target.children).filter((ch) => ch.tagName === 'path');
  const circleElems = Array.from(target.children).filter((ch) => ch.tagName === 'circle');

  const colors = ['blue', 'yellow', 'magenta', 'cyan'];

  // Init path colors
  Array.from(target.children).filter(
    (ch) => (ch.style.transitionDelay = `${transitionDelay / 1000}s`)
  );
  pathElems.forEach((pathElem) => {
    pathElem.style.fill = intervalTime ? 'blue' : 'black';
  });
  circleElems.forEach((circleElem, i) => {
    circleElem.style.fill = intervalTime ? colors[i + (1 % colors.length)] : 'blue';
  });

  // Set interval
  if (intervalTime) {
    let colorIdx = 0;
    return setInterval(() => {
      Array.from(target.children).filter((ch) => (ch.style.transitionDelay = '0s'));
      pathElems.forEach((pathElem) => {
        pathElem.style.fill = colors[colorIdx % colors.length];
      });
      circleElems.forEach((circleElem, i) => {
        circleElem.style.fill = colors[(colorIdx + i + 1) % colors.length];
      });
      colorIdx += 1;
    }, intervalTime);
  }
};
