import { encode, decode, Type } from './1062/mod.ts';

const test = (number: number, type: string) => {
    const str: string = encode(number, type);
    console.log(`number to ${type} string`, str);
    console.log(`${type} string to number`, decode(str, type));
}

const number: number = 18650;

// test(number, Type.default);
// test(number, Type.chinese);
// test(number, Type.emoji);

for (const type in Type) {
    test(number, type);
}

console.log("emoji" in Type)