import { IhslObject } from './utilsInterfaces' 

function randomInt(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateRandomPrettyHSL() : IhslObject {
    return { 
        h: randomInt(0, 360),
        s: randomInt(42, 98),
        l: randomInt(40, 90)
    }
}

const HSLToRGB = (hsl : IhslObject) => {
    let {h, s, l} = hsl
    s /= 100;
    l /= 100;
    const k = (n : any) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n : any) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
};


export function generateRandomRGBAsString () : string {
    const [randomRed, randomGreen, randomBlue] = HSLToRGB( generateRandomPrettyHSL() )

    return `
        rgb(${randomRed}, ${randomGreen}, ${randomBlue})
    `
}

export function generateRGBAsStringFromString( str : string ) {
    const {r, g, b} = hexToRgb( stringToColour(str) )

    return `
        rgb(${r}, ${g}, ${b})
    `
}

var stringToColour = function(str : string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
  
function hexToRgb(hex : any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
  }