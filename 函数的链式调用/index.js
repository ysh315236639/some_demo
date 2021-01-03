// 函数链式调用ES5写法
function LazeMan (str) {
  this.syncTask = []
  this.asyncTask = []

  if (this instanceof LazeMan) {
    return this
  }
  const self = new LazeMan()
  self.hi(str)
  self.trigger()
  return self
}

LazeMan.prototype.hi = function (str) {
  this.asyncTask.push(((str) => () => {
    return new Promise(resolve => {
      console.log(`Hi this is ${str}!`)
      resolve()
    })
  })(str))
  return this
}

LazeMan.prototype.sleep = function (number) {
  this.asyncTask.push(((number) => () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('sleep', number)
        resolve()
      }, number * 1000)
    })
  })(number))
  return this
}

LazeMan.prototype.eat = function (str) {
  this.asyncTask.push(((str) => () => {
    return new Promise(resolve => {
      console.log(`Eat ${str}!`)
      resolve()
    })
  })(str))
  return this
}

LazeMan.prototype.sleepFirst = function (number) {
  this.syncTask.push(((number) => () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('first', number)
        resolve()
      }, number * 1000)
    })
  })(number))
  return this
}

LazeMan.prototype.trigger = function () {
  setTimeout(async() => {
    const tasks = [...this.syncTask, ...this.asyncTask]
    for (const item of tasks) {
      await item()
    }
  }, 0)
}

LazeMan('aaa').sleep(5).sleepFirst(2).eat('bbb')