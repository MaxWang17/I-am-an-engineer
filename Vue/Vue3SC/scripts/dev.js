// 只针对具体的包进行打包
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

// 只打包特定的
async function build(target) { // 对每个目录到底要干嘛，target就是路径
    // 第一个传参是指令，比如w，就是watch的意思
    // 第二个传参（数组）可理解为rollup的配置项
    // 第三个传参（对象）作用：让子进程共享打包的结果给父进程
    await execa('rollup', [
        '-cw',
        '--environment',
        `TARGET:${target}`
    ],
    {stdio:"inherit"}
    )
}

const target = 'reactivity'
build(target)