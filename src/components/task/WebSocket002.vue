<template>
  <div>
    <button v-on:click="connect">连接</button>
    <button v-on:click="send">发送</button>
    <task-item></task-item>
  </div>
</template>

<script>

import WebSocketer from '../libs/web_socket.js'
import TaskItem from './TaskItem.vue'
// import RefElement from './RefElement002.vue'

export default {
  name: 'Canvas_001',
  components: {
    TaskItem
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
