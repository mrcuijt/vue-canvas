<template>
  <div>
    <button
      id="btn1"
      @click="btnUpdate([{id:1,reqTotal:2000},{id:2,reqTotal:200},{id:3,reqTotal:30},{id:4,reqTotal:1}])"
    >数据1</button>&nbsp;&nbsp;
    <button
      id="btn2"
      @click="btnUpdate([{id:1,reqTotal:800},{id:2,reqTotal:700},{id:3,reqTotal:500},{id:4,reqTotal:100}])"
    >数据2</button>&nbsp;&nbsp;
    <button
      id="btn3"
      @click="btnUpdate([{id:1,reqTotal:1500},{id:2,reqTotal:2300},{id:3,reqTotal:300},{id:4,reqTotal:50}])"
    >数据3</button>&nbsp;&nbsp;
    <button
      id="btn4"
      @click="btnUpdate([{id:4,reqTotal:2000},{id:3,reqTotal:200},{id:2,reqTotal:30},{id:1,reqTotal:1}])"
    >数据4</button>&nbsp;&nbsp;
  </div>
  <canvas
    id="canvas"
    v-bind:width="width"
    v-bind:height="height"
    @mouseover="mouseover"
    @mouseout="mouseout"
  ></canvas>
</template>

<script>
import bus from '../libs/bus.js'
// 高度统一，动态计算自身所在位置，比对当前所在位置，动态移动
// 变动频繁时，如何保证有序？
// 自定义事件，改动顺位，调起任务
// 数据刻度尺
// 数据渲染
// 1.1 以所有数据中总量最大的数据的为基准，计算最大占比，计算最大数据高度。
// 静态数据渲染模式
// 动态数据渲染模式
// 动画渲染速度处理
class Rect {
  constructor(id, index, space, color, reqTotal) {
    this.id = id
    this.maxWidth = 0
    this.maxHeigth = 0
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.index = index
    this.space = space
    this.color = color
    this.reqTotal = reqTotal
    this.init = false
    this.drawFinish = false
  }

  draw (ctx, width, height, reqMax) {
    this.drawFinish = false
    var percentage = this.reqTotal / reqMax
    var _width = width * percentage
    _width = (_width > width) ? width : _width
    _width = (_width < 15) ? 15 : _width
    this.initState(_width, height)
    this.changeState(_width, height)
    this.calcPosition()
    //ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  initState (width, height) {
    if (this.init)
      return
    this.maxWidth = width
    this.maxHeigth = height
    this.width = 0
    this.height = 50
    this.x = 0
    this.y = (this.index - 1) * 50 + (this.index * this.space)
    this.init = true
  }

  changeState (width, height) {
    this.maxWidth = width
    this.maxHeigth = height
  }

  calcPosition () {
    // 状态副本
    var oldWidth = this.width
    var oldY = this.y
    // 数据变动
    if (this.width < this.maxWidth - 10) {
      // 数据增长
      this.width += 1
      if (this.width > this.maxWidth - 10) {
        this.width = this.maxWidth - 10
      }
    } else {
      // 数据减小
      this.width -= 1
      if (this.width < this.maxWidth - 10) {
        this.width = this.maxWidth - 10
      }
    }

    // 顺位改变
    var incr = 1
    var cur = (this.index - 1) * 50 + (this.index * this.space)
    if (this.y != cur) {
      if (this.y < cur) {
        this.y += incr
        if (this.y > cur) {
          this.y = cur
        }
      }
      if (this.y > cur) {
        this.y -= incr
        if (this.y < cur) {
          this.y = cur
        }
      }
    }
    if (
      oldWidth === this.width
      && oldY === this.y
      && this.y === cur
      && this.width === this.maxWidth - 10
    ) {
      this.drawFinish = true
    }
  }
}


export default {
  name: 'Canvas_002',
  components: {
  },
  data () {
    return {
      width: 350,
      height: 750,
      ctx: null,
      arf: {},
      reqMax: 1200,
      datas: [
        new Rect(1, 1, 10, 'rgb(255,0,0)', 200), // red
        new Rect(2, 2, 10, 'rgb(0,255,0)', 300), // green
        new Rect(3, 3, 10, 'rgb(0,0,255)', 500), // blue
        new Rect(4, 4, 10, 'rgb(255,255,0)', 800) // yellow
      ]
    }
  },
  created () {
    bus.on('drawEventStart', this.drawEventStart)
    bus.on('drawRangeEventStart', this.drawRangeEventStart)
    bus.on('drawEventStop', this.drawEventStop)
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas: function () {
      var canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d')
        this.ctx.fillRect(this.x, this.y, 0, 0)
      }
    },
    fill: function () {
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.sort()
      // this.datas.sort(this.compareValues('index', 'desc'))
      for (var i = 0; i < this.datas.length; i++) {
        this.datas[i].draw(this.ctx, this.width, this.height, this.reqMax)
      }
      this.arf = window.requestAnimationFrame(this.fill)
      var drawFinish = this.datas.filter((item) => item.drawFinish === false).length === 0
      if (drawFinish === true) {
        bus.emit('drawEventStop')
      }
      console.info(new Date())
    },
    sort: function () {
      this.datas.sort(this.compareValues('reqTotal', 'desc'))
      for (var i = 0; i < this.datas.length; i++) {
        this.datas[i].index = i + 1
      }
      this.datas.sort(this.compareValues('index', 'desc'))
    },
    mouseover: function () {
      bus.emit('drawEventStart')
    },
    mouseout: function () {
      bus.emit('drawRangeEventStart')
    },
    btnUpdate: function (array) {
      for (var i = 0; i < this.datas.length; i++) {
        for (var j = 0; j < array.length; j++) {
          if (this.datas[i].id === array[j].id) {
            this.datas[i].reqTotal = array[j].reqTotal
            break
          }
        }
      }
      bus.emit('drawEventStart')
    },
    compareValues: function (key, order = 'asc') {
      return function innerSort (a, b) {
        if (!a[key] || !b[key]) {
          return 0
        }
        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return ((order === 'desc') ? (comparison * -1) : comparison)
      }
    },
    drawEventStart: function () {
      this.arf = window.cancelAnimationFrame(this.arf)
      this.arf = window.requestAnimationFrame(this.fill)
    },
    drawRangeEventStart: function () {
      this.arf = window.cancelAnimationFrame(this.arf)
      this.arf = window.requestAnimationFrame(this.fill)
    },
    drawEventStop: function () {
      this.arf = window.cancelAnimationFrame(this.arf)
    }
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
