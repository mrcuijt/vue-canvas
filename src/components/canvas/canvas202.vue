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
      datas: [50, 100, 150, 200], // 初始数据
      labels: ['A', 'B', 'C', 'D'] // 初始标签D
    }
  },
  created () {
  },
  mounted () {
    this.drawChart()
    // 模拟数据动态增长
    setInterval(() => {
      // 添加新数据
      const newData = Math.floor(Math.random() * 200) + 50
      this.datas.push(newData)
      this.labels.push('New')

      // 对数据和标签进行排序
      const sortedData = this.datas.slice().sort((a, b) => b - a)
      const sortedLabels = []
      for (let i = 0; i < sortedData.length; i++) {
        const index = this.datas.indexOf(sortedData[i])
        sortedLabels.push(this.labels[index])
      }

      // 更新数据和标签
      this.datas = sortedData
      this.labels = sortedLabels

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
      // 计算柱状图的宽度
      const barWidth = 30
      const spacing = 10
      const startX = 50
      let x = startX
      // 绘制柱状图
      for (let i = 0; i < data.length; i++) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(x, 250 - data[i], barWidth, data[i])

        // 绘制标签
        ctx.fillStyle = 'black'
        ctx.fillText(labels[i], x + 5, 270)

        // 更新x坐标
        x += barWidth + spacing
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
