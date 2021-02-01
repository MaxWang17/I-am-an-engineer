import { observe } from "./observe/index";

// Vue的数据有data，methods，watch......
export function initState(vm) {
    // 将所有数据都定义在vm上，并后续更改要触发视图更新。
    const opts = vm.$options;
    // 以下均为初始化
    if (opts.props) {

    }
    if (opts.methods) {

    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {

    }
    if (opts.watch) {

    }
}

function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    // 数据劫持 Object.defineProperty
    let { data } = vm.$options
    // 对data类型进行判断，函数就直接执行后获取其返回值作为数据（顺便绑定了一下实例）
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // vm._data.name === vm.name
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    // 观测数据
    observe(data)
}