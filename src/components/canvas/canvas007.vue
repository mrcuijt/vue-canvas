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

// 高度统一，动态计算自身所在位置，比对当前所在位置，动态移动
// 变动频繁时，如何保证有序？
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
        {
          x: 0, y: 0,
          width: 0, height: 0,
          maxWidth: 0, maxHeigth: 0,
          label: '',
          index: 1,
          space: 10,
          init: false,
          draw: function (ctx, width, height) {
            this.initState(width, height)
            this.calcPosition()
            ctx.fillStyle = 'rgb(0,0,0)'
            ctx.fillRect(this.x, this.y, this.width, this.height)
          },
          initState: function (width, height) {
            if (this.init)
              return
            this.maxWidth = width
            this.maxHeigth = height
            this.width = 0
            this.height = 50
            this.x = 0
            this.y = (this.index - 1) * 50 + (this.index * this.space)
            this.init = true
          },
          calcPosition: function () {
            this.width += 10
            if (this.width > this.maxWidth - 10) {
              this.width = this.maxWidth - 10
            }
          }
        },
        {
          x: 0, y: 0,
          width: 0, height: 0,
          maxWidth: 0, maxHeigth: 0,
          label: '',
          index: 2,
          space: 10,
          init: false,
          draw: function (ctx, width, height) {
            this.initState(width, height)
            this.calcPosition()
            ctx.fillStyle = 'rgb(0,0,0)'
            ctx.fillRect(this.x, this.y, this.width, this.height)
          },
          initState: function (width, height) {
            if (this.init)
              return
            this.maxWidth = width
            this.maxHeigth = height
            this.width = 0
            this.height = 50
            this.x = 0
            this.y = (this.index - 1) * 50 + (this.index * this.space)
            this.init = true
          },
          calcPosition: function () {
            this.width += 10
            if (this.width > this.maxWidth - 10) {
              this.width = this.maxWidth - 10
            }
          }
        },
        {
          x: 0, y: 0,
          width: 0, height: 0,
          maxWidth: 0, maxHeigth: 0,
          label: '',
          index: 3,
          space: 10,
          init: false,
          draw: function (ctx, width, height) {
            this.initState(width, height)
            this.calcPosition()
            ctx.fillStyle = 'rgb(0,0,0)'
            ctx.fillRect(this.x, this.y, this.width, this.height)
          },
          initState: function (width, height) {
            if (this.init)
              return
            this.maxWidth = width
            this.maxHeigth = height
            this.width = 0
            this.height = 50
            this.x = 0
            this.y = (this.index - 1) * 50 + (this.index * this.space)
            this.init = true
          },
          calcPosition: function () {
            this.width += 10
            if (this.width > this.maxWidth - 10) {
              this.width = this.maxWidth - 10
            }
          }
        },
      ]
    }
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
      for (var i = 0; i < this.datas.length; i++) {
        this.datas[i].draw(this.ctx, this.width, this.height)
      }
      this.arf = window.requestAnimationFrame(this.fill)
    },
    mouseover: function () {
      this.arf = window.requestAnimationFrame(this.fill)
    },
    mouseout: function () {
      this.arf = window.cancelAnimationFrame(this.arf)
    },
  },
  mounted () {
    this.initCanvas()
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
