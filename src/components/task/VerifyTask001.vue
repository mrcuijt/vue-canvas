<template>
  <canvas id="canvas" width="120" height="50"></canvas>
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
        ctx.font = '20px serif'
        ctx.fillText('Hello World', 10, 30)
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
