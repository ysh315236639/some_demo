// 类实现函数链式调用

class _LazeMan {
  constructor(str) {
    this.syncTask = []
    this.asyncTack = []
    this.str = str
  }

  hi(str) {
    this.asyncTack.push(((str) => () => {
      return new Promise(resolve => {
        console.log(`Hi this is ${str}`)
        resolve()
      })
    })(str))
    return this
  }

  sleep(number) {
    this.asyncTack.push(((number) => () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('sleep', number)
          resolve()
        }, number * 1000)
      })
    })(number))
    return this
  }

  eat(str) {
    this.asyncTack.push(((str) => () => {
      return new Promise(resolve => {
        console.log(`Eat ${str}!`)
        resolve()
      })
    })(str))
    return this
  }

  sleepFirst(number) {
    this.syncTask.push(((number) => () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`First ${number}`)
          resolve()
        }, number * 1000)
      })
    })(number))
    return this
  }

  trigger() {
    setTimeout(async() => {
      const tasks = [...this.syncTask, ...this.asyncTack]
      for(const item of tasks) {
        await item()
      }
    }, 0)
  }
}

function LazeMan(str) {
  const self = new _LazeMan()
  self.hi(str)
  self.trigger()
  return self
}

LazeMan('aaa').sleep(5).sleepFirst(2).eat('bbb')