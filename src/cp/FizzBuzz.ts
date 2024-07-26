export function fizzBuzz(a: number): string[] {
    const result: string[] = [];
    
    for (let i = 1; i <= a; i++) {
      if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0) {
        result.push('FizzBuzz');
      } else if (i % 5 === 0 && i % 7 === 0) {
        result.push('Fizz3');
      }  else if (i % 3 === 0 && i % 7 === 0) {
        result.push('Fizz2');
      } else if (i % 3 === 0 && i % 5 === 0) {
        result.push('Fizz1');
      } else if (i % 7 === 0) {
        result.push('Buzz3');
      } else if (i % 5 === 0) {
        result.push('Buzz2');
      } else if (i % 3 === 0) {
        result.push('Buzz1');
      } else {
        result.push(i.toString());
      }
    }
    return result; 
}
  