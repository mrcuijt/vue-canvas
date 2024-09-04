<template>
  <div>
    <button v-on:click="connect">连接</button>
    <button v-on:click="send">发送</button>
    <button v-on:click="menu">菜单</button>
    <menu-item
      v-show="isVisable"
      v-on:publish="publish"
    ></menu-item>
    <room-item
      v-for="item in rooms"
      :key="item.roomId"
      :room="item"
    ></room-item>
  </div>
</template>

<script>

import WebSocketer from '../libs/web_socket.js'
import RoomItem from './RoomItem002.vue'
import MenuItem from './MenuItem.vue'

export default {
  name: 'Canvas_001',
  components: {
    MenuItem, RoomItem
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
      isVisable: false,
      rooms: [],
      datas: {
      }, // 初始数据
    }
  },
  methods: {
    connect: function (e) {
      e instanceof Event
      // 建立
      var webSocketer = new WebSocketer(() => { })
      this.sockets.push(webSocketer)
      webSocketer.connect()
    },
    send: function () {
      this.sockets[0].send(new Date())
    },
    menu: function () {
      this.isVisable = !this.isVisable
    },
    publish (data) {
      for (var i = 0; i < data.length; i++) {
        var exists = false
        for (var j = 0; j < this.rooms.length; j++) {
          if (data[i].roomId == this.rooms[j].roomId) {
            this.rooms[j] = data[i]
            exists = true
            break
          }
        }
        if (exists === false) {
          this.rooms.push(data[i])
        }
      }
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
