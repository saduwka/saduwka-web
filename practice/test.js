const solve = (l, r) => {
    const isPrime = (num) => {
        if (num <= 1) return false;

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }
        
        return true;
    }
  
    const countDivisors = (num) => {
        let count = 0;

        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                count++;

                if (i !== num / i) {
                    count++;
                }
            }
         }

      return count;
    }
  
    let result = 0;

    for (let i = l; i <= r; i++) {
        if (i > 1) {
            let divisorsCount = countDivisors(i);

            if (!isPrime(i) && isPrime(divisorsCount)) {
                result++;
            }
        }
    }

    return result;
}
  
console.log(solve(1, 9));