import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default { // 用于打包的配置
    input: './src/index.js',
    output: {
        format: 'umd', // 模块化类型,umd就可以挂载到window
        file: 'dist/vue.js', 
        name: 'Vue', // 打包后的全局变量的名字
        sourcemap: true // es6->es5
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            open:true,
            openPage:"/public/index.html",
            port:3000,
            contentBase:''
        })
    ]
}