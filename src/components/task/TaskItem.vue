<template>
  <button v-on:click="imgChange">切换</button>
  <div class="preview">
    <canvas
      id="preview-canvas"
      ref="previewCanvas"
    ></canvas>
  </div>
  <div class="data-content">
    <canvas
      id="data-canvas"
      ref="dataCanvas"
    ></canvas>
    <img
      id="data-img"
      ref="dataImg"
      v-on:load="imgLoad"
    />
  </div>
  <img
    width="50"
    src="../../assets/logo.png"
  />
  <div class="data-item">
    <button v-on:click="show">查看</button>
  </div>
</template>

<script>

import { ref, onMounted } from 'vue'
import img1 from '../../assets/logo.png'
import img2 from '../../assets/010341200061sysx2A203_D_10000_1200.jpg'

export default {
  name: 'Canvas_001',
  props: {
    name: String,
    item: Object
  },
  components: {
  },
  setup () {
    const previewCanvas = ref(null)
    const dataImg = ref(null)
    const dataCanvas = ref(null)
    // 页面挂载后才能获得
    onMounted(() => {
      console.info(previewCanvas, this)
    })
    // ...
    return {
      previewCanvas, dataImg, dataCanvas
    }
  },
  created () {
  },
  data () {
    return {
      links: [
        img2,
        img1,
        img2,
      ],
      cur: 0,
      init: '0'
    }
  },
  methods: {
    drawView () {
      var $canvas = this.dataCanvas
      var $canvas2 = this.previewCanvas
      $canvas2.width = 50
      $canvas2.height = 50


      const context2 = $canvas2.getContext('2d')

      // 复制第一个画布的内容到第二个画布
      const dataURL = $canvas.toDataURL()
      const $img = new Image()
      $img.width = $canvas2.width
      $img.height = $canvas2.height
      // $img.style['height'] = 'auto'
      console.log($img.width, $img.height)
      $img.src = dataURL
      $img.onload = function () {
        // context2.drawImage($img, 0, 0)
        context2.drawImage($img, 0, 0, $img.width, $img.height)
      }
    },
    draw () {
      var $img = this.dataImg
      var $canvas = this.dataCanvas

      $canvas.width = $img.width
      $canvas.height = $img.height

      var tempctx = $canvas.getContext('2d')
      tempctx.clearRect(0, 0, $img.width, $img.height)
      tempctx.drawImage($img, 0, 0)

      this.drawView()
    },
    imgChange () {
      this.cur++
      if (this.cur >= this.links.length) {
        this.cur = 0
      }
      this.dataImg.src = this.links[this.cur]
    },
    imgLoad () {
      this.draw()
    },
    show () {
      console.info('查看', this.init, this.name, this.item)
    }
  },
  mounted () {
    this.dataImg.src = this.links[0]
    console.info('挂载', this.init, this.name)
  },
  unmounted () {
    console.info('卸载', this.init, this.name)
  }
}
</script>

<style>
div.data-item {
  border: 1px solid #000;
}

div.data-content {
  width: 400px;
  height: 400px;
  overflow: scroll;
}

#preview-canvas {
  width: 50;
  height: 50;
  border: 1px solid #000;
}

#data-img {
  border: 1px solid #000;
}

#data-canvas {
  border: 1px solid #000;
}
</style>
