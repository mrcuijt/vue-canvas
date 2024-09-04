<template>
  <div>
    <button v-on:click="connect">连接</button>
    <button v-on:click="send">发送</button>
    <button v-on:click="danmuk">弹幕</button>
  </div>
</template>

<script>

import operator from '../libs/operator.js'

class WebSocketer {

  constructor() {
    this.socket = {},
    this.name = 'WebSocket'
  }
  connect () {
    // 建立 WebSocket 连接
    this.socket = new WebSocket('ws://127.0.0.1:8600/tools/websocket/command')
    this.socket.onopen = () => { this.onOpen() }
    this.socket.onclose = () => { this.onClose() }
  }
  // 心跳保持
  heart () {
  }
  send (message) {
    this.socket.send(message)
  }
  // 接收消息
  onMessage (event) {
    console.info(event.data)
    console.info(this)
  }
  // 会话建立
  onOpen () {
    this.socket.onmessage = (event) => {
      this.onMessage(event)
    }
    var obj = {
      cmd: 'AUTH',
      data: {
        userId: 'demo',
        reqTime: '2024-07-19 17:19:20'
      }
    }
    this.send(JSON.stringify(obj))
    obj.cmd = 'TASK_INIT'
    operator.process(JSON.stringify(obj))
  }
  // 会话关闭
  onClose () {
  }

}

export default {
  name: 'Canvas_001',
  components: {
  },
  created () {
  },// 侦听器
  watch: {
    // 深度监听
  },
  data () {
    return {
      taskNo: '',
      current: 0,
      sockets: [],
      datas: {
      }, // 初始数据
    }
  },
  methods: {
    connect: function (e) {
      e instanceof Event
      // 建立
      var webSocketer = new WebSocketer()
      this.sockets.push(webSocketer)
      webSocketer.connect()
    },
    send: function () {
      this.sockets[0].send(new Date())
    },
    danmuk: function () {
      var obj = {
        cmd: 'DANMUK_MSG',
        data: {
          roomId: '21696950'
        }
      }
      this.sockets[0].send(JSON.stringify(obj))
    }
  },
  mounted () {
  },
}
</script>

<style>
#canvas {
  border: 1px solid #000;
}

table tr td:first-child {
  text-align: right;
}
</style>
