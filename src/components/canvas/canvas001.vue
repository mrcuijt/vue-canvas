<template>
  <canvas id="canvas" width="150" height="150"></canvas>
</template>

<script>

export default {
  name: 'Canvas_001',
  components: {
  },
  methods: {
    initCanvas: function () {
      var canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgb(200,0,0)'
        ctx.fillRect(10, 10, 55, 50)
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
        ctx.fillRect(30, 30, 55, 50)
      }
    }
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
