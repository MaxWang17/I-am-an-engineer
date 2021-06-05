var VueReactivity = (function (exports) {
    'use strict';

    const isObject = (value) => typeof value == 'object' && value !== null;
    const extend = Object.assign;

    function effect(fn, options = {}) {
        // 我需要effect变成响应式的，数据变化可以重新执行
        const effect = createReactiveEffect(fn, options);
        if (!options.lazy) {
            // 利用配置的lazy属性
            effect(); // 响应式的effect会默认先执行一次
        }
        return effect;
    }
    let uid = 0;
    let activeEffect; // 存储当前正在运行的effect
    const effectStack = []; // 存储用的栈
    function createReactiveEffect(fn, options) {
        const effect = function reactiveEffect() {
            if (!effectStack.includes(effect)) {
                // 保证effect不在栈里才执行
                // 函数执行可能报错，所以用try-finally兜底一下
                try {
                    effectStack.push(effect);
                    activeEffect = effect; // 头秃写法
                    return fn();
                }
                finally {
                    // 不管有无异常都执行
                    effectStack.pop();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect.id = uid++; // 制作一个effect标识，用于区分effect
        effect._isEffect = true; // 用于标识这个是响应式effect
        effect.row = fn; // 保留effect对应的原函数
        effect.options = options; // 在effect上保存用户的属性
        return effect;
    }
    // 让，某个对象中的属性，收集当前它对应的effect
    const targetMap = new WeakMap();
    function track(target, type, key) {
        // activeEffect; // 关联已创建，你学废了吗
        if (activeEffect === undefined) {
            // 此属性不用收集依赖，因为没在effect中使用
            return;
        }
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            //初次取值找不到
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
        console.log(targetMap, "勇敢的少年快去创造奇迹");
    }
    // 需求场景1：
    // 以下是头秃写法的坑，为了解决这种顺序错乱的问题，要搞个栈做处理（先进后出，弹夹）
    // 原理：函数调用是是个栈型结构
    // effect(()=>{ // effect1
    //     state.name // => effect1
    //     effect(()=>{ // effect2
    //         state.age // => effect2
    //     })
    //     state.sex // 按逻辑应该是effect1，但是如果没有一个栈做处理，就会变成effect2了
    // })
    // 需求场景2：
    // 如果对于effect是否已入栈不检查，以下就会出现死循环
    // effect(()=>{
    //     state.xxx++
    // })

    // 实现关键的Handelr，里面有get、有set
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
    const mutableHandlers = {
        get,
    };
    const shallowReactiveHandlers = {
        get: shallowGet,
    };
    const readonlyHandlers = extend({
        get: readonlyGet,
    }, readonlyObj);
    const shallowReadonlyHandlers = extend({
        get: shallowReadonlyGet,
    }, readonlyObj);
    function createGetter(isReadonly = false, isShallow = false) {
        // 核心拦截方法
        return function get(target, key, receiver) {
            // let proxy = reactivee()
            // proxy + reflect(后续obiect上的方法会被迁移到reflect)
            // 在以前，target[key] = vlaue 可能会失败（如果target只读），并不会报异常，也没有返回值标识
            // reflect方法具备返回值
            const res = Reflect.get(target, key, receiver);
            if (!isReadonly) {
                // 收集依赖，会等数据变化后更新对应的视图
                console.log("收集effect", new Date);
                track(target, 0 /* GET */, key); // TrackOpTypes.GET目前只是一个标识
            }
            if (isShallow) {
                return res;
            }
            if (isObject(res)) { // vue2 是一上来就递归，vue3 是当取值时会进行代理。vue3的代理模式是懒代理。
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }

    function reactive(target) {
        return createReactiveObject(target, false, mutableHandlers);
    }
    function shallowReactive(target) {
        return createReactiveObject(target, false, shallowReactiveHandlers);
    }
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers);
    }
    function shallowReadonly(target) {
        return createReactiveObject(target, true, shallowReadonlyHandlers);
    }
    // 是不是只读，是不是深度。完全可以用参数配置，所以考虑柯里化，公用同一个方法（省的写四遍）
    // vue3响应式底层核心原理是：new Proxy  其本质还是操作get和set
    const reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄露，存储的key只能是对象
    const readonlyMap = new WeakMap();
    function createReactiveObject(target, isReadonly, baseHanelers) {
        // 如果目标不是对象，没法拦截了，reactive这个api只能拦截对象类型
        if (!isObject(target)) {
            return target;
        }
        // 如果某个对象已经被代理，就不要再次代理
        const proxyMap = isReadonly ? readonlyMap : reactiveMap;
        const exisProxy = proxyMap.get(target);
        if (exisProxy) {
            return exisProxy;
        }
        // 发现未被代理，那么代理一下，并存储到map里以备查询
        const proxy = new Proxy(target, baseHanelers);
        proxyMap.set(target, proxy); // 将要代理的对象和对应的代理结果缓存起来
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=reactivity.global.js.map
