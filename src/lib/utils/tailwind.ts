const generateStyle: any = (
  styleName: string,
  styleMobile: number,
  styleDesctop: number
) => {
  let tick = Number(((styleDesctop - styleMobile) / 3).toFixed(1));
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
    let name = `${className}${spaceSizes[i].max}`;
    result[name] = generateStyle(
      styleName,
      spaceSizes[i].min,
      spaceSizes[i].max
    );
  }
  return result;
};
export { generateSpace, generateStyle };
