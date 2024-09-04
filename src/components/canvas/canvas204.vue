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
      // 添加新数据
      const newData = Math.floor(Math.random() * 200) + 50
      data.push(newData)
      labels.push('New')
      // 对数据和标签进行排序
      this.sortData()
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
        ctx.fillStyle = 'black'
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
    },
    sortData: function () {
      var data = this.datas
      let i = 0
      const sortingInterval = setInterval(() => {
        if (i < data.length - 1) {
          let j = i + 1
          const innerSortingInterval = setInterval(() => {
            if (j > 0 && data[j - 1] < data[j]) {
              this.swapData(j, j - 1)
              this.drawChart()
            } else {
              clearInterval(innerSortingInterval)
            }
            j--
          }, 1000) // 控制排序动画速度
        } else {
          clearInterval(sortingInterval)
        }
        i++
      }, 3000) // 控制排序间隔
    },
    swapData: function (index1, index2) {
      var data = this.datas
      var labels = this.labels
      var a = [data[index1], data[index2]] = [data[index2], data[index1]]
      a = [labels[index1], labels[index2]] = [labels[index2], labels[index1]]
      if (a === 1) a = 1
    }
  }
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
