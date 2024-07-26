export function maxValueOFArray(strs : any[], m : number , n : number): number{
    const data = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0)
    );

    const count = (str) => {
        let zero = 0;
        for (const char of str) {
            if (char === '0') {
                zero++;
            }
        }
        return [zero, str.length - zero];
    };

    for (const str of strs) {
        const [zeroes, ones] = count(str);
        for (let i = m; i >= zeroes; --i) {
            for (let j = n; j >= ones; --j) {
                data[i][j] = Math.max(data[i][j], data[i - zeroes][j - ones] + 1);
            }
        }
    }
    return data[m][n];
}


