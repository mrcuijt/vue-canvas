<template>
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
class Rect {
  constructor(index, space, color) {
    this.maxWidth = 0
    this.maxHeigth = 0
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.index = index
    this.space = space
    this.color = color
    this.init = false
    this.drawFinish = false
  }

  draw (ctx, width, height) {
    this.drawFinish = false
    this.initState(width, height)
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

  calcPosition () {
    // 状态副本
    var oldWidth = this.width
    var oldY = this.y
    // 数据增长
    this.width += 1
    if (this.width > this.maxWidth - 10) {
      this.width = this.maxWidth - 10
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
      datas: [
        new Rect(1, 10, 'rgb(255,0,0)'), // red
        new Rect(2, 10, 'rgb(0,255,0)'), // green
        new Rect(3, 10, 'rgb(0,0,255)'), // blue
        new Rect(4, 10, 'rgb(255,255,0)') // yellow
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
      this.datas.sort(this.compareValues('index', 'desc'))
      for (var i = 0; i < this.datas.length; i++) {
        this.datas[i].draw(this.ctx, this.width, this.height)
      }
      this.arf = window.requestAnimationFrame(this.fill)
      var drawFinish = this.datas.filter((item) => item.drawFinish === false).length === 0
      if (drawFinish === true) {
        bus.emit('drawEventStop')
      }
      console.info(new Date())
    },
    mouseover: function () {
      bus.emit('drawEventStart')
    },
    mouseout: function () {
      bus.emit('drawRangeEventStart')
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
      this.datas[0].index = 1
      this.datas[1].index = 2
      this.datas[2].index = 3
      this.datas[3].index = 4
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
