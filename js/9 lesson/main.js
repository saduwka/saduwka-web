//Создайте объект с тремя свойствами разного типа данных и определите тип каждого свойства.

function isAnagramm(str = "", str1 = "") {
  if (str.length == str1.length) {
    let reverStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
      reverStr = reverStr + str[i];
    }

    if (reverStr == str1) {
      return true;
    }
  }

  return false;
}

const result = isAnagramm("апорт", "тропа");

console.log(result);

function calcLetters(word, word2) {
  const result = {};
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (result[letter]) {
      result[letter]++;
    } else {
      result[letter] = 1;
    }
  }
  // console.log(result);

  const result2 = {};
  for (let i = 0; i < word2.length; i++) {
    let letter = word2[i];
    if (result2[letter]) {
      result2[letter]++;
    } else {
      result2[letter] = 1;
    }
  }
  // console.log(result2);

  function objectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length != keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] != obj2[key]) {
        return false;
      }
    }
    return true;
  }
  const equal = objectsEqual(result, result2);

  console.log(`Слова "${word}" и "${word2}" анаграмма: ${equal}`);

  return equal;
}

calcLetters("кабан", "банка");
calcLetters("акабан", "банка");
calcLetters("австралопитек", "ватерполистка");
