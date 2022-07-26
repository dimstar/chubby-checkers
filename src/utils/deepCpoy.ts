/**
 * Util function for deep copy of nested array
 * @param nestedArr
 * @returns
 */
function deepCopy<Type>(nestedArr: Type[][]): Type[][] {
  return JSON.parse(JSON.stringify(nestedArr));
}

export default deepCopy;
