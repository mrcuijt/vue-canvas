<template>
  <canvas
    id="canvas"
    width="150"
    height="150"
  ></canvas>
</template>

<script>

export default {
  name: 'Canvas_002',
  components: {
  },
  methods: {
    initCanvas: function () {
      var canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(75, 50)
        ctx.lineTo(100, 75)
        ctx.lineTo(100, 25)
        ctx.fill()
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
