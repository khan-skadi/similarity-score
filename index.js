const deepDiff = require('deep-diff');
const a = require('./data/BreweriesSample1.json');
const b = require('./data/BreweriesSample2.json');
const c = require('./data/BreweriesSample3.json');
const d = require('./data/BreweriesSample4.json');
const e = require('./data/BreweriesSample5.json');

function similarityScore(x, y) {
  // Find differences between the objects
  diffResult = deepDiff(x, y);
  const diffKeys = diffResult.length;

  // Get all keys from object
  function getKeys(object) {
    function iterate(obj, arr) {
      if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length) {
          keys.forEach(function (k) {
            iterate(obj[k], arr.concat(k));
          });
        }
        return;
      }
      result.push(arr.join('.'));
    }

    let result = [];
    iterate(object, []);
    const length = result.length;

    return length;
  }

  let totalKeys;
  const totalKeysX = getKeys(x);
  const totalKeysY = getKeys(y);
  if (totalKeysX > totalKeysY) {
    totalKeys = totalKeysX;
  } else totalKeys = totalKeysY;

  const sameKeys = totalKeys - diffKeys;
  const similarity = ((sameKeys / totalKeys) * 100).toFixed(2) + '%';
  console.log('Similarity Score:', similarity);
}

console.log(similarityScore(a, b));
console.log(similarityScore(b, c));
console.log(similarityScore(c, d));
console.log(similarityScore(d, e));
console.log(similarityScore(a, c));
console.log(similarityScore(c, e));
