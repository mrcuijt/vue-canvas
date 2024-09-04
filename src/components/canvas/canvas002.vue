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
      const canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        ctx.fillRect(25, 25, 100, 100)
        ctx.clearRect(45, 45, 60, 60)
        ctx.strokeRect(50, 50, 50, 50)
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
