import { countReset } from "console";

export type Dict<A> = {
	[key: string]: A;
};

// Array.prototype.map, but for Dict
export function mapDict<A, B>(
	mapperFn: (valueToBeMapped: A, index: number, dict: Dict<A>) => B,
	dict: Dict<A>
): Dict<B> {
	const mappedDict: Dict<B> = {};
	let counter = 0;

	for (let [key, value] of Object.entries(dict)) {
		mappedDict[key] = mapperFn(value, counter, dict);
		counter++;
	}
	return mappedDict;
}

// Array.prototype.reduce, but for Dict
export function reduceDict<A, B>(
	reducerFn: (
		accumulator: B | undefined,
		current: A,
		index: number,
		dict: Dict<A>
	) => B,
	dict: Dict<A>
): B | undefined {
	let accumulator;
	let counter = 0;
	for (let value of Object.values(dict)) {
		accumulator = reducerFn(accumulator, value, counter, dict);
		counter++;
	}
	return accumulator;
}

let obj = { a: 1, b: 2, c: 3 };
console.log(mapDict(x => x * 2, obj)); // {a:2, b: 4, c: 6}
console.log(
	reduceDict((acc, cur) => (acc != undefined ? acc + cur : 0 + cur), obj)
); // 6
