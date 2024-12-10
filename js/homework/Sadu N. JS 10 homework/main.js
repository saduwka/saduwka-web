const students = [
    {   
        name: 'Алексей', 
        age: 20, 
        grades: { 
            math: 85, 
            physics: 78, 
            chemistry: 92 
        } 
    },
    {   
        name: 'Мария', 
        age: 22, 
        grades: { 
            math: 95, 
            physics: 88, 
            chemistry: 75 
        } 
    },
    {  
        name: 'Иван', 
        age: 21, 
        grades: { 
            math: 70, 
            physics: 65, 
            chemistry: 80 
        } 
    },
    {   
        name: 'Ольга',
        age: 23, 
        grades: { 
            math: 85, 
            physics: 92, 
            chemistry: 89 
        } 
    },
    {   
        name: 'Дмитрий',
        age: 20,
        grades: { 
            math: 60, 
            physics: 72, 
            chemistry: 68 
        } 
    }
];

console.log(students);

const adultStudents = [];

function filterAge(student){
    if (student.age > 20) {
        adultStudents.push(student.name);
    }
    return 
}

const adult = students.filter(filterAge);
console.log(adultStudents);

function calcAverage(grades){
    const values = Object.values(grades);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    return sum / values.length;
}

function processStudent(student){
    const average = calcAverage(student.grades);
    return {
        name: student.name,
        averageGrade: average.toFixed(2),
    }
}

const gpa = students.map(processStudent);

console.log(gpa);

function findHighAverage(students){
    const best = []
    for (let i = 0; i < students.length; i++){
        const student = students[i];
        if (best.length == 0){
            best.push(student);
        } else {
            const averages = [];
            for (let j = 0; j < best.length; j++) {
                averages.push(best[j].averageGrade);
            }
            const maxAverage = Math.max.apply(null, averages);
            if (student.averageGrade > maxAverage){
                best.shift();
                best.push(student);
            }
        }
    }
    return best;
}

const bestStudents = findHighAverage(gpa);
console.log(bestStudents);

function highPhysics(student){
    return student.grades.physics > 80
}

const studentsHighPhysics = students.filter(highPhysics);

console.log(studentsHighPhysics);




