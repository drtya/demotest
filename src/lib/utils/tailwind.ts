'use server'
const generateStyle = (
  styleName: string,
  styleMobile: number,
  styleDesctop: number
) => {
  const tick = Number(((styleDesctop - styleMobile) / 3).toFixed(1));
  return {
    [styleName]: `${styleMobile}px`,
    '@media (min-width: 768px)': {
      [styleName]: `${styleMobile + tick}px`,
    },
    '@media (min-width: 1024px)': {
      [styleName]: `${styleMobile + tick * 2}px`,
    },
    '@media (min-width: 1280px)': {
      [styleName]: styleDesctop,
    },
  };
};
interface IIntendSide {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
const generateIndent = (
  styleName: string,
  styleMobile: IIntendSide,
  styleDesctop: IIntendSide
) => {
  const tickTop = Number(((styleDesctop.top - styleMobile.top) / 3).toFixed(1));
  const tickRight = Number(
    ((styleDesctop.right - styleMobile.right) / 3).toFixed(1)
  );
  const tickBottom = Number(
    ((styleDesctop.bottom - styleMobile.bottom) / 3).toFixed(1)
  );
  const tickLeft = Number(
    ((styleDesctop.left - styleMobile.left) / 3).toFixed(1)
  );
  return {
    [`${styleName}-top`]: `${styleMobile.top}px`,
    [`${styleName}-right`]: `${styleMobile.right}px`,
    [`${styleName}-bottom`]: `${styleMobile.bottom}px`,
    [`${styleName}-left`]: `${styleMobile.left}px`,
    '@media (min-width: 768px)': {
      [`${styleName}-top`]: `${styleMobile.top + tickTop}px`,
      [`${styleName}-right`]: `${styleMobile.right + tickRight}px`,
      [`${styleName}-bottom`]: `${styleMobile.bottom + tickBottom}px`,
      [`${styleName}-left`]: `${styleMobile.left + tickLeft}px`,
    },
    '@media (min-width: 1024px)': {
      [`${styleName}-top`]: `${styleMobile.top + tickTop * 2}px`,
      [`${styleName}-right`]: `${styleMobile.right + tickRight * 2}px`,
      [`${styleName}-bottom`]: `${styleMobile.bottom + tickBottom * 2}px`,
      [`${styleName}-left`]: `${styleMobile.left + tickLeft * 2}px`,
    },
    '@media (min-width: 1280px)': {
      [`${styleName}-top`]: `${styleDesctop.top}px`,
      [`${styleName}-right`]: `${styleDesctop.right}px`,
      [`${styleName}-bottom`]: `${styleDesctop.bottom}px`,
      [`${styleName}-left`]: `${styleDesctop.left}px`,
    },
  };
};

const generateSpace: any = (className: string, styleName: string) => {
  const spaceSizes = [
    {
      min: 50,
      max: 80,
    },
    {
      min: 26,
      max: 40,
    },
    {
      min: 18,
      max: 32,
    },
    {
      min: 12,
      max: 24,
    },
    {
      min: 12,
      max: 20,
    },
    {
      min: 10,
      max: 16,
    },
    {
      min: 7,
      max: 10,
    },
  ];
  const result: any = [];
  for (let i = 0; i < spaceSizes.length; i++) {
    const name = `${className}${spaceSizes[i].max}`;
    result[name] = generateStyle(
      styleName,
      spaceSizes[i].min,
      spaceSizes[i].max
    );
  }
  return result;
};
export { generateSpace, generateStyle, generateIndent };
