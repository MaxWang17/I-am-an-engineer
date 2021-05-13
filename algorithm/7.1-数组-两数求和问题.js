const twoSum = function(nums, target) {
    const diffs = new Map();

    for(let i = 0 ;i < nums.length ;i++){
        if(diffs.has(target-nums[i])){
            return [diffs.get(target-nums[i]),i]
        }else{
            diffs.set(nums[i],i)
        }
    }
}

let result = twoSum( [2, 7, 11, 15],18)
console.log(result)