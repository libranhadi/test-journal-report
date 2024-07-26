export function subArray(nums:number[], k : number) : number {
    let max = 0; 
    let totalSum = 0; 

    for (const num of nums) {
        max = Math.max(max, num);
        totalSum += num;
    }

    const splitMaxSum = (maxSum) => {
        let subarraySum = 0; 
        let subarrayCount = 1; 
        for (const num of nums) {
            subarraySum += num;
            if (subarraySum > maxSum) {
                subarraySum = num;
                subarrayCount++; 
            }
        }
        return subarrayCount <= k;
    };

    let start = max; 
    let end = totalSum; 
    while (start < end) {
        const mid = start + ((end - start) >> 1); 
        if (splitMaxSum(mid)) {
            end = mid; 
        } else {
            start = mid + 1; 
        }
    }
    return start;

}