export default function chunk(array: any[], size: number): any[][] {
  return array.reduce((acc, value, i) => {
    const n = Math.floor(i / size);
    if(!acc[n]) { acc[n] = []; }
    acc[n].push(value);
    return acc;
  }, []);
}