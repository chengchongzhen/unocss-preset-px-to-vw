const pxToVwRE = /(-?[\.\d]+)px/g;
const defaultOptoins = {
  unitToConvert: 'px',
  viewportWidth: 320,
  unitPrecision: 5,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  exclude: undefined,
  include: undefined,
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}

export default function pxToVwPreset(options = defaultOptoins) {
  return {
    name: '@unocss/preset-px-to-vw',
    postprocess: (util) => {
      const pxReplace = createPxReplace(options)
      util.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === 'string' && pxToVwRE.test(value))
          i[1] = value.replace(pxToVwRE, pxReplace);
      });

      console.log(util.entries);
    },
  };
}

function createPxReplace(opts) {
  return function (m, $1) {
    if (!$1) return m;
    var pixels = parseFloat($1);
    if (pixels <= opts.minPixelValue) return m;
    var parsedVal = toFixed((pixels / opts.viewportWidth * 100), opts.unitPrecision);
    return parsedVal === 0 ? '0' : parsedVal + opts.viewportUnit;
  };
}

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1)
  const  wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}
