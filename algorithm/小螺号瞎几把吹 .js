// const twoSun = function(nums,target){
//     const diffs = {}
//     const len = nums.length
//     for(let i = 0;i<len;i++){
//         if(diffs[target-nums[i]]!==undefined){
//             return [diffs[target-nums[i]],i]
//         }
//         diffs[nums[i]] = i
//     }

// }
// const twoSun = function(nums,target){
//     const diffs = new Map()
//     const len = nums.length
//     for(let i = 0;i<len;i++){
//         if(diffs.has(target-nums[i])){
//             return [diffs.get(target-nums[i]),i]
//         }
//         diffs.set(nums[i],i)
//     }

// }

// const merge = function(nums1,m,nums2,n){
//     let i = m - 1,j = n-1,k=m+n-1;
//     while(i>=0 && j>=0){
//         if(nums1[i] >= nums2[j]){
//             nums1[k] = nums1[i]
//             i--
//             k--
//         }else{
//             nums1[k] = nums2[i]
//             j--
//             k--
//         }
//     }

//     while(j>0){
//         nums1[k] = nums2[j]
//         k--
//         j--
//     }
// }

const threeSum = function(nums){
    let res = []

    // 给nums排序
    nums = nums.sort((a,b)=>{
        return a-b
    })

    const len = nums.length
    // 注意：遍历到倒数第三个数就足够了，因为左右指针会遍历最后两个数
    for(let i = 0;i<len-2;i++){
        // 左指针
        let j = i + 1
        // 右指针
        let k = len - 1
        // 数字连续重复，则跳过
        if(i>0&&nums[i]===nums[i-1]) {
            continue
        }
        while(j<k){
            
        }
    }
}