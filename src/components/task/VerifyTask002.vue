<template>
  <div>
    <div><button @click="drawTxT">开始</button></div>
    <div>
      <p>{{ taskNo}}</p>
    </div>
    <canvas
      id="canvas"
      v-bind:width="width"
      v-bind:height="height"
    ></canvas>
  </div>
</template>

<script>

import { api } from '../../api/axios'

export default {
  name: 'Canvas_001',
  components: {
  },
  created () {
    // this.roundDatas()
    var promise = api.post('http://127.0.0.1:8600/tools/task/get', {})
    var this_ = this
    promise.then(function (data) {
      console.info(data.data.data)
      this_.taskNo = data.data.data.taskNo
    })
  },
  data () {
    return {
      width: 120,
      height: 50,
      canvas: {},
      ctx: {},
      set: new Set(),
      taskNo: '',
      current: 0,
      datas: [
        { 0: '00001', 1: '00001.jpg', 2: '10' }, { 0: '00002', 1: '00002.jpg', 2: '10' },
        { 0: '00003', 1: '00003.jpg', 2: '10' }, { 0: '00004', 1: '00004.jpg', 2: '10' },
        { 0: '00005', 1: '00005.jpg', 2: '10' }, { 0: '00006', 1: '00006.jpg', 2: '10' },
        { 0: '00007', 1: '00007.jpg', 2: '10' }, { 0: '00008', 1: '00008.jpg', 2: '10' },
        { 0: '00009', 1: '00009.jpg', 2: '10' }, { 0: '00010', 1: '00010.jpg', 2: '10' }], // 初始数据
    }
  },
  methods: {
    initCanvas: function () {
      var canvas = document.getElementById('canvas')
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        ctx.font = '20px serif'
        ctx.fillText('Hello World', 10, 30)
        this.ctx = ctx
        this.canvas = canvas
      }
    },
    drawTxT: function () {
      var datas = this.datas
      if (this.current >= datas.length) {
        this.current = 0
      }
      var obj = {
        taskName: '',
        taskNo: '',
        itemNo: '',
        httpRespCode: ''
      }
      var text = datas[this.current][0]
      obj.itemNo = text
      obj.httpRespCode = '200'
      var verify = this.set.has(this.current + 1)
      if (verify === true) {
        text = 'Error Set'
        obj.httpRespCode = '500'
      }
      this.ctx.fillStyle = 'rgb(255,255,255)'
      this.ctx.fillRect(0, 0, this.width, this.height)
      this.ctx.fillStyle = 'rgb(0,0,0)'
      this.ctx.font = '20px serif'
      this.ctx.fillText(text, 10, 30)
      var current_ = this.current
      if (verify === false) {
        this.canvas.toBlob(function (blob) {
          var name = datas[current_][1]
          var f = new File([blob], name, { type: blob.type })
          console.info(f)
          var form = new FormData()
          form.append('file', f)
          var xhr = new XMLHttpRequest()
          xhr.open('post', 'http://127.0.0.1:8600/tools/upload', true)
          xhr.onload = function () {
            console.info('---end')
            //setTimeout(function () { loadImage() }, '800')
            api.postJson('http://127.0.0.1:8600/tools/task/notifyStatus', obj)
          }
          xhr.send(form)
        }, 'image/jpeg')
      } else {
        api.postJson('http://127.0.0.1:8600/tools/task/notifyStatus', obj)
      }
      this.current++
    },
    randomSet: function () {
      this.set.clear()
      var set = this.set
      for (; set.size < 3;) {
        var random = (Math.random() + '')
        random = random.substring(random.length - 1)
        set.add(parseInt(random))
      }
      console.info(set)
    },
    roundDatas: function () {
      var temp = ''
      for (var i = 0; i < 10; i++) {
        var demo = {}
        var item = (100000 + i + 1 + '').substring(1)
        demo[0] = item
        demo[1] = item + '.jpg'
        demo[2] = '10'
        temp += JSON.stringify(demo) + ','
        console.info(temp.replaceAll('"0"', '0').replaceAll('"1"', '1').replaceAll('"2"', '2'))
      }
    }
  },
  mounted () {
    this.initCanvas()
    this.randomSet()
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}
</style>
