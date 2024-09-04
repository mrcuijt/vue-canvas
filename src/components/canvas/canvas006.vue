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

export default {
  name: 'Canvas_002',
  components: {
  },
  data () {
    return {
      width: 350,
      height: 350,
      ctx: null,
      incr: 0,
      x: 0,
      y: 290,
      arf: {}
    }
  },
  methods: {
    initCanvas: function () {
      var canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        this.ctx = canvas.getContext('2d')
        this.ctx.fillRect(this.x, this.y, 0, 50)
      }
    },
    fill: function () {
      this.incr++
      this.y -= 2
      if (this.incr > this.width - 10) {
        window.cancelAnimationFrame(this.raf)
        return
      }
      if (this.y < 10) {
        this.y = 10
      }
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.ctx.fillStyle = 'rgb(0,0,0)'
      this.ctx.fillRect(this.x, this.y, this.incr, 50)
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
