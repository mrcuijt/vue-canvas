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
      datas: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 }
      ], // 初始数据
    }
  },
  created () {
  },
  mounted () {
    this.drawBarChart(this.datas)
    this.animateGrowth(this.datas, 2000, false)
  },
  methods: {
    drawBarChart: function (data) {
      var canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      // 清除画布  
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // 设置颜色和样式等...  
      // 遍历数据并绘制每个柱子  
      data.forEach((item, index) => {
        const x = index * (canvas.width / data.length) // 计算 x 位置  
        const y = canvas.height - item.value * (canvas.height / 100) // 计算 y 位置（假设最大值为 100）  
        const width = canvas.width / data.length - 10 // 柱子宽度  
        const height = item.value * (canvas.height / 100) // 柱子高度  
        // const height = 0 // 柱子高度  
        // 绘制柱子...  
        ctx.fillRect(x, y, width, height)
        // 添加文本等...  
      })
    },
    animateGrowth: function (data, duration = 5000, sortAfterGrowth = true) {
      // 假设每个数据项都将增长到 150  
      // const targetValues = data.map(item => ({ ...item, targetValue: 150 }))

      let startTime = null
      let isGrowthFinished = false

      var _drawBarChart = this.drawBarChart

      function step (timestamp) {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        // data.forEach((item, index) => {
        //   const growth = (targetValues[index].targetValue - item.value) * progress
        //   item.value += growth
        // })

        // 如果需要在增长后排序，执行排序并重新绘制  
        data.sort((a, b) => b.value - a.value) // 按值降序排序  
        _drawBarChart(data)

        if (progress < 1) {
          // 如果增长尚未完成，继续动画  
          window.requestAnimationFrame(step)
        } else if (sortAfterGrowth) {
          // 如果需要在增长后排序，执行排序并重新绘制  
          data.sort((a, b) => b.value - a.value) // 按值降序排序  
          _drawBarChart(data)
          isGrowthFinished = true // 标记增长已完成  
        }

        if (isGrowthFinished) {
          isGrowthFinished = true
        }
        // 如果需要，可以在这里添加额外的逻辑来处理增长完成后的其他动画或操作  
      }

      window.requestAnimationFrame(step)

      // 如果需要在增长过程中进行排序（这可能会导致不太自然的动画效果）  
      // 可以在 step 函数中的 drawBarChart 调用之前添加排序逻辑
    },
    f4: function () {

    },
    f5: function () {

    }
  },

}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
