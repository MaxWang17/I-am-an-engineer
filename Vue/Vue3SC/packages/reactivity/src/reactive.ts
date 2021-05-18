import { isObject } from "@vue/shared/src"
import {
    mutableHandlers,
    shallowReactiveHandlers,
    readonlyHandlers,
    shallowReadonlyHandlers,
} from './baseHandlers'



export function reactive(target) {
    return createReactiveObject(target, false, mutableHandlers)
}
export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers)
}
export function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers)
}
export function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers)
}

// 是不是只读，是不是深度。完全可以用参数配置，所以考虑柯里化，公用同一个方法（省的写四遍）
// vue3响应式底层核心原理是：new Proxy  其本质还是操作get和set
const reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄露，存储的key只能是对象
const readonlyMap = new WeakMap();
export function createReactiveObject(target, isReadonly, baseHanelers) {
    // 如果目标不是对象，没法拦截了，reactive这个api只能拦截对象类型
    if (isObject(target)) {
        return target
    }

    // 如果某个对象已经被代理，就不要再次代理
    const proxyMap = isReadonly ? readonlyMap : reactiveMap
    const exisProxy = proxyMap.get(target)
    if (exisProxy) {
        return exisProxy
    }
    // 发现未被代理，那么代理一下，并存储到map里以备查询
    const proxy = new Proxy(target, baseHanelers);
    proxyMap.set(target, proxy) // 将要代理的对象和对应的代理结果缓存起来

    return proxy;
}
