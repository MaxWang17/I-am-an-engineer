const isObject = (value)=> typeof value == 'object' && value !== null
const extend = Object.assign
const isArray = Array.isArray
const isFunction = (value)=> typeof value == 'function'
const isNumber = (value)=> typeof value == 'number'
const isString = (value)=> typeof value == 'string'
const isIntegerKey = (key)=> parseInt(key) + '' === key
const hasOwn = (target,key)=> Object.prototype.hasOwnProperty.call(target,key)
const hasChanged = (oldValue,value) => oldValue !== value

export{
    isObject,
    extend,
    isArray,
    isFunction,
    isNumber,
    isString,
    isIntegerKey,
    hasOwn,
    hasChanged
}