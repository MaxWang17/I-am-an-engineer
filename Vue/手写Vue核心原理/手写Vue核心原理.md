[toc]

# 手写Vue核心原理

## 一. 使用Roollup搭建开发环境

### 1. 什么是Rollup？

*Rollup* 是一个 JavaScript 模块打包器,可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 （开发应用时使用Wwebpack，开发库时使用Rollup）

### 2. 环境搭建

```
npm install rollup rollup-plugin-babel @babel/preset-env @babel/core rollup-plugin-serve cross-env -D
```

- rollup-plugin-babel :  *Rollup*与*Babel*的桥梁
- @babel/core：*Babel*核心模块
- @babel/preset-env：es6转es5
- rollup-plugin-serve:  启动webpack服务

### 3. SBS

1. 安装rollup依赖
2. 创建`rollup.config.js`
3. 创建public文件夹，引用打包后结果
4. 创建src文件夹，真正的源代码
5. 创建.babelrc，配置babel

## 二. Vue初始化流程

### 1. SBS

1. 初始化init函数。当用户newVue时，便调用此init方法。
2. 拆分逻辑到不同文件中，通过模块化思想提高可维护性
3. 新建init.js，导出initMixin方法
4. 【混入】在index.js中调用initMixin，手动混入到index.js中Vue方法的原型上。然后index.js中调用_init就有了
5. vm.$options。vm就是构造出的实例。
6. 【响应式】响应式数据变化，数据代理 Object.defineProperty
7. 【粒度越来越细】新建state.js，编写initState方法。在init.js中引用state.js中导出的初始化initState方法。
8. initState.js分别处理Vue的数据（data,methods,watch......）
9. 【重头戏，数据劫持*Object.defineProperty*】其中处理data的方法为initData
   1. 对data类型进行判断（data是不是函数）；顺便`data.call(vm)`一下，绑定到实例上
   2. 【重头中的重头】observe函数
10. 新建observe文件夹，及文件夹内index.js。observe文件夹index.js中编写observe函数
11. observe函数只对对象类型进行观测（需判断下）；通过**类**实现数据观测（类拓展性好，且可产生有唯一标识的实例）：Observer类。
12. 【重头中的重头中的重头】Observer类中编写walk方法，其作用为：**重新定义data的属性**
    1. **【defineReactive工具方法是重头中的重头中的重头的重头】**循环data的key，对每个键值对用defineReactive工具方法重新定义为响应式
    2. **defineReactive工具方法就用到了鼎鼎大名的Object.defineProperty**
    3. 问题来了：重新定义后（劫持后）的新数据，怎么回头给到实例？
       1. 定义vm._data获取劫持后的数据
       2. **通过代理（Vue2.0用的是proxy工具函数，还不是es6的proxy），做到`vm._data.name === vm.name`**

