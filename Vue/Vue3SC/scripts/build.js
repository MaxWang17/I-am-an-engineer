// 把packages下所有包进行打包

const execa = require('execa');
const fs = require('fs');

// 只要文件夹，不要文件
const targets = fs.readdirSync('packages').filter(f => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
        return false;
    }
    return true;
})

console.log(targets)

// 对我们的目标进行依次打包，并行打包

async function build(target) { // 对每个目录到底要干嘛，target就是路径
    // 第二个传参（数组）可理解为rollup的配置项
    // 第三个传参（对象）作用：让子进程共享打包的结果给父进程
    await execa('rollup', [
        '-c',
        '--environment',
        `TARGET:${target}`
    ],
    {stdio:"inherit"}
    )
}
function runParallel(targets, iteratorFn) { // 循环每个目录
    const res = [];
    for (const item of targets) {
        const p = iteratorFn(item)
        res.push(p);
    }
    return Promise.all(res);
}

runParallel(targets, build).then(() => {
    // 所有包打包完毕后的回调
}) 