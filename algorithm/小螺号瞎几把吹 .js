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

const merge = function (nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            i--
            k--
        } else {
            nums1[k] = nums1[j]
            j--
            k--
        }
    }
    while (j >= 0) {
        nums1[k] = nums[j]
        j--
        k--
    }
}

// const threeSum = function(nums){
//     let res = []
//     nums = nums.sort((a,b)=>{
//         return a - b
//     })
//     const len = nums.length

//     // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
//     for(let i=0;i<len-2;i++){
//         // 左指针 j
//         let j = i + 1
//         // 右指针 k
//         let k = len - 1
//         // 如果遇到重复的数字，则跳过
//         if(i>0&&nums[i]===nums[i-1]){
//             continue
//         }
//         // 正题
//         while(j<k){
//             // 三数之和小于0，左指针推进
//             if(nums[i]+nums[j]+nums[k]<0){
//                 j++
//                 while(j<k&&nums[j]===nums[j-1]){
//                     j++
//                 }
//             }else if(nums[i]+nums[j]+nums[k]>0){
//                 k--
//                 while(j<k&&nums[k]===nums[k+1]){
//                     k--
//                 }
//             }else{
//                 res.push([nums[i],nums[j],nums[k]])
//                 j++
//                 k--
//                 while(j<k&&nums[j]===nums[j-1]){
//                     j++
//                 }
//                 while(j<k&&nums[k]===nums[k+1]){
//                     k--
//                 }
//             }
//         }
//     }
// }

// function isPalindrome(str) {
//     // 缓存字符串的长度
//     const len = str.length
//     for(let i = 0;i<len/2;i++){
//         if(str[i]!==str[len-i-1]){
//             return false
//         }
//     }
//     return true
// }

const validPalindrome = function (s) {
    // 工具方法，用于判断字符串是否回文
    function isPalindrome(st, ed) {
        while (st < ed) {
            if (s[st] !== s[ed]) {
                return false
            }
            st++
            ed--
        }
        return true
    }
    const len = s.length
    let i = 0, j = len - 1
    // 当左右指针均满足对称时，一起向中间推进
    while (i < j && s[i] === s[j]) {
        i++
        j--
    }

    // 尝试判断跳过左指针后字符串是否回文
    if (isPa)
}