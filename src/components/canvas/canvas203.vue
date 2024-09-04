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
    var _data = this.datas
    var _labels = this.labels
    // 模拟数据动态增长
    setInterval(() => {
      // 添加新数据
      var data = _data
      var labels = _labels
      const newData = Math.floor(Math.random() * 200) + 50
      data.push(newData)
      labels.push('New')

      // 对数据和标签进行排序
      const sortedData = data.slice().sort((a, b) => b - a)
      const sortedLabels = []
      for (let i = 0; i < sortedData.length; i++) {
        const index = data.indexOf(sortedData[i])
        sortedLabels.push(labels[index])
      }

      // 更新数据和标签
      data = sortedData
      labels = sortedLabels

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
        const barHeight = data[i]
        const barX = x
        const barY = 250 - barHeight

        // 使用渐变填充颜色，实现动画效果
        const gradient = ctx.createLinearGradient(0, barY, 0, 250)
        gradient.addColorStop(0, 'blue')
        gradient.addColorStop(1, 'lightblue')
        ctx.fillStyle = gradient

        // 绘制动画效果
        this.animateBar(barX, barY, barWidth, barHeight, ctx)

        // 绘制标签
        ctx.fillStyle = 'rgb(255,0,255)'
        ctx.fillText(labels[i], x + 5, 270)

        // 更新x坐标
        x += barWidth + spacing
      }
    },
    animateBar: function (x, y, width, height, ctx) {
      let currentHeight = 0
      const animationInterval = setInterval(() => {
        if (currentHeight >= height) {
          clearInterval(animationInterval)
        } else {
          ctx.fillRect(x, 250 - currentHeight, width, currentHeight)
          currentHeight += 5 // 控制动画速度
        }
      }, 30) // 控制动画帧率
    }
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
