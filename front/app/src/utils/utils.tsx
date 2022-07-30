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

    console.log(randomRed, randomGreen, randomBlue)

    return `
        rgb(${randomRed}, ${randomGreen}, ${randomBlue})
    `
}
