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
      width: 400,
      height: 200,
      ctx: null,
      arf: {},
      reqMax: 1200,
      datas: [10, 20, 15, 25, 30],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    }
  },
  created () {
  },
  mounted () {
    this.drawChart()
    // 模拟数据动态增长
    setInterval(() => {
      this.datas.push(Math.floor(Math.random() * 30) + 10)
      this.labels.push('New')
      this.drawChart()
    }, 2000)
  },
  methods: {
    drawChart: function () {
      var canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      var data = this.datas
      var labels = this.labels
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制坐标轴
      ctx.beginPath()
      ctx.moveTo(50, 20)
      ctx.lineTo(50, 180)
      ctx.lineTo(350, 180)
      ctx.stroke()

      // 绘制数据折线
      ctx.beginPath()
      ctx.moveTo(50, 180 - data[0])
      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(50 + i * 60, 180 - data[i])
      }
      ctx.strokeStyle = 'blue'
      ctx.stroke()

      // 绘制数据点
      ctx.fillStyle = 'blue'
      for (let i = 0; i < data.length; i++) {
        ctx.beginPath()
        ctx.arc(50 + i * 60, 180 - data[i], 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // 绘制标签
      ctx.fillStyle = 'black'
      ctx.font = '12px Arial'
      for (let i = 0; i < labels.length; i++) {
        ctx.fillText(labels[i], 45 + i * 60, 195)
      }
    }
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
