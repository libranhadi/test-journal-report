import { fizzBuzz } from '../src/cp/FizzBuzz'; 
import { maxValueOFArray } from '../src/cp/MaxValueOfArray';
import { subArray } from '../src/cp/SubArray';


describe('FizzBuzz function', () => {
  it('should return correct fizzBuzz array', () => {
    const result1 = fizzBuzz(15);
    const result2 = fizzBuzz(5);
    const result3 = fizzBuzz(3);
    const result4 = fizzBuzz(21);

    expect(result1).toEqual(["1","2","Buzz1","4","Buzz2","Buzz1","Buzz3","8","Buzz1","Buzz2","11","Buzz1","13","Buzz3","Fizz1"]);
    expect(result2).toEqual(["1","2","Buzz1","4","Buzz2"]);
    expect(result3).toEqual(["1","2","Buzz1"]);
    expect(result4).toEqual(["1","2","Buzz1","4","Buzz2","Buzz1","Buzz3","8","Buzz1","Buzz2","11","Buzz1","13","Buzz3","Fizz1","16", "17", "Buzz1", "19", "Buzz2", "Fizz2"]);
  });
});

describe('MaxValueOfArray function', () => {
    it('should return correct maxValueOFArray', () => {
      const result1 = maxValueOFArray( ["10","0001","111001","1","0"], 5, 3)
      const result2 = maxValueOFArray( ["10","0","1"], 1, 1)
      expect(result1).toEqual(4);
      expect(result2).toEqual(2);
    });
});



describe('SubArray function', () => {
  it('should return correct SubArray', () => {
    const result1 = subArray([7,2,5,10,8], 2)
    const result2 = subArray([1,2,3,4,5], 2)
    expect(result1).toEqual(18);
    expect(result2).toEqual(9);
  });
});
