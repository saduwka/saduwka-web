function minOpsToMakeMultiple(a, m) {
	let remainder = a % m;
	if (remainder === 0) return 0;
	return m - remainder;
}

function findMinOperations(n, x, y, z, a) {
	let minOpsX = Infinity,
		minOpsY = Infinity,
		minOpsZ = Infinity;
	let minOpsXY = Infinity,
		minOpsXZ = Infinity,
		minOpsYZ = Infinity;

	for (let i = 0; i < n; i++) {
		let opsX = minOpsToMakeMultiple(a[i], x);
		let opsY = minOpsToMakeMultiple(a[i], y);
		let opsZ = minOpsToMakeMultiple(a[i], z);

		minOpsX = Math.min(minOpsX, opsX);
		minOpsY = Math.min(minOpsY, opsY);
		minOpsZ = Math.min(minOpsZ, opsZ);

		minOpsXY = Math.min(minOpsXY, opsX + opsY);
		minOpsXZ = Math.min(minOpsXZ, opsX + opsZ);
		minOpsYZ = Math.min(minOpsYZ, opsY + opsZ);
	}

	return Math.min(minOpsX + minOpsY + minOpsZ, minOpsXY, minOpsXZ, minOpsYZ);
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").split("\n");

const [n, x, y, z] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);

console.log(findMinOperations(n, x, y, z, a));
