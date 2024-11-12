const getOutput = (str) => {
    const array = str.split(',')
    
    const numbers = new Set()
    
    array.forEach(item => {
        if (item.includes('-')) {
            const [start, end] = item.split('-').map(Number)

            for (let i = start; i <= end; i++) {
                numbers.add(i)
            }
        } else {
            numbers.add(+item)
        }
    })

    return [...numbers].sort((a, b) => a - b).join(' ')
}