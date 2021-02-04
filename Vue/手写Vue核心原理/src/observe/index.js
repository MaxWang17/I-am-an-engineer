import { set } from "lodash";

class Observer {
    constructor(value) { // 对Value这个属性重新定义
        this.walk(value)
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        })
    }
}

function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        get() {
            console.log('get')
            return value;
        },
        set(newValue) {
            console.log('set')
            if (newValue === value) return;
            value = newValue;
        }
    })

}

export function observe(data) {
    // 只对对象类型进行观测 
    if (typeof data !== 'object' || data == null) {
        return;
    }
    // 通过**类**实现数据观测（类拓展性好，且可产生有唯一标识的实例）
    return new Observer(data)
}