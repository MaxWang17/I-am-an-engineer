export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options);

  if(!options.lazy){ // 利用配置的lazy属性
      effect(); // 响应式的effect会默认先执行一次
  }

  return effect;
}



let uid = 0
let activeEffect; // 存储当前正在运行的effect
const effectStack = [] // 
function createReactiveEffect(fn, options){
    const effect = function reactiveEffect(){
        if(!effectStack.includes(effect)){ // 保证effect不在栈里才执行
            // 函数执行可能报错，所以用try-finally兜底一下
            try{
                effectStack.push(effect)
                activeEffect = effect // 头秃写法
                return fn() 
            }finally{ // 不管有无异常都执行
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.id = uid++ // 制作一个effect标识，用于区分effect
    effect._isEffect = true // 用于标识这个是响应式effect
    effect.row = fn // 保留effect对应的原函数
    effect.options = options // 在effect上保存用户的属性
    return effect
}

// 让，某个对象中的属性，收集当前它对应的effect
const targetMap = new WeakMap()
export function track(target,type,key){
    // activeEffect; // 关联已创建，你学废了吗
    if(activeEffect === undefined){ // 此属性不用收集依赖，因为没在effect中使用
        return;
    }
    let depsMap =  targetMap.get(target)
    if(!depsMap){ //初次取值找不到
        targetMap.set(target,(depsMap = new Map))
    }
    let dep = depsMap.get(key);
    if(!dep){
        depsMap.set(key,(dep = new Set))
    }
    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
    }
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