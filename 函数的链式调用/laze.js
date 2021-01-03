
function LazeMan (str) {
  this.syncTask = []
  this.asyncTask = []

  if (this instanceof LazeMan) {
    return this
  }
  const self = new LazeMan()
  self.hi(str)
  return self
}

LazeMan.prototype.hi = function (str) {
  this.asyncTask.push(((str) => () => {
    return new Promise(resolve => {
      console.log(`Hi this is ${str}!`)
      resolve()
    })
  })(str))
  this.trigger()
  return this
}

LazeMan.prototype.sleep = function (number) {
  this.asyncTask.push(((number) => () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
        console.log(`sleep, ${number}`)
      }, number * 1000)
    })
  })(number))
  this.trigger()
  return this
}

LazeMan.prototype.eat = function (str) {
  this.asyncTask.push(((str) => () => {
    return new Promise(resolve => {
      console.log(`Eat ${str}!`)
      resolve()
    })
  })(str))
  this.trigger()
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
  this.trigger()
  return this
}

LazeMan.prototype.trigger = function () {
  clearTimeout(this.timer)
  this.timer = setTimeout(async () => {
    const tasks = [...this.syncTask, ...this.asyncTask]
    this.reset()
    tasks.reduce(async (acc, taskFn) => {
      await acc.then(() => {
        return taskFn()
      })
      return acc
    }, Promise.resolve())
  }, 0)
}

LazeMan.prototype.reset = function () {
  this.syncTask = []
  this.asyncTask = []
}

const instance = LazeMan('aaa').sleep(5).sleepFirst(2).eat('bbb')
setTimeout(() => {
  instance.sleep(3).eat('ccc').sleepFirst(5).eat('ddd')
}, 1000 * 10)
