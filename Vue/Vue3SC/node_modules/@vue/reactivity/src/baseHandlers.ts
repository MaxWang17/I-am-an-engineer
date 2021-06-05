// 实现关键的Handelr，里面有get、有set

import { extend, isArray, isObject } from "@vue/shared/src";
import { track } from "./effect";
import { TrackOpTypes } from "./operators";
import { reactive, readonly } from "./reactive";

// 考虑1：是不是仅读，仅读的属性set时会报异常
// 考虑2：是不是深度

let readonlyObj = {
  set: (target, key) => {
    console.warn(`set on key  ${key} failed`);
  },
};

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);

const mutableHandlers = {
  get,
};

const shallowReactiveHandlers = {
  get: shallowGet,
};

const readonlyHandlers = extend(
  {
    get: readonlyGet,
  },
  readonlyObj
);

const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet,
  },
  readonlyObj
);

export {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
};

function createGetter(isReadonly = false, isShallow = false) {
  // 核心拦截方法
  return function get(target, key, receiver) {
    // let proxy = reactivee()
    // proxy + reflect(后续obiect上的方法会被迁移到reflect)
    // 在以前，target[key] = vlaue 可能会失败（如果target只读），并不会报异常，也没有返回值标识
    // reflect方法具备返回值

    const res = Reflect.get(target, key, receiver);

    if(!isReadonly){
        // 收集依赖，会等数据变化后更新对应的视图
        console.log("收集effect",new Date)
        track(target,TrackOpTypes.GET,key) // TrackOpTypes.GET目前只是一个标识
    }

    if(isShallow){
        return res
    }

    if(isObject(res)){ // vue2 是一上来就递归，vue3 是当取值时会进行代理。vue3的代理模式是懒代理。
        return isReadonly ? readonly(res):reactive(res)
    }

    return res;
  };
}
function createSetter(isShallow = false) {
  // 核心设置方法
  return function set(target, key, value, receiver) {
    // 当数据更新时，通知对应属性的effect重新执行

    // 我们要区分是新增还是修改的。vue2里无法监控更改索引，无法监控数组长度变化；vue3都解决了。但其中还是有不得不hack的地方。

    const oldValue = target[key]; // 获取老的值
    const res = Reflect.set(target, key, value, receiver);
    
    // 先看看是不是数组
    


    return res;
  };
}
