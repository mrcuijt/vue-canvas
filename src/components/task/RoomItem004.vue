<template>
  <div class="content">
    <div class="operator">
      <button v-on:click="webConnect">连接</button>
      <button v-on:click="webAccept">启动</button>
      <button v-on:click="webDisconnect">停止</button>
      <button v-on:click="$emit('remove-room', room.roomId)">移除</button>
      <button v-on:click="webReset">进度重置</button>
    </div>
    <div class="title">
      <div class="room">
        <span v-if="room.roomId">房间号：{{ room.roomId }}</span>
        <span v-else>UNKNOW</span>
      </div>
      <div class="live-up">
        <span v-if="room.up">主播：{{ room.up }}</span>
        <span v-else>UNKNOW</span>
      </div>
      <div class="live-title">
        <span v-if="room.title">房间名：{{ room.title }}</span>
        <span v-else>UNKNOW</span>
      </div>
      <div class="status"><button class="success-status"></button>Running</div>
    </div>
    <div class="danmuk">
      <ul>
        <li
          v-for="item in danmukArry"
          :key="item.id"
        >{{ item.id }} | {{ item.danmuk }} | {{ item.danmukTime }} | {{ item.danmukUserName }} | {{ item.danmukUserId }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

// import operator from '../libs/operator.js'
import WebSocketer from '../libs/web_socket_001.js'

export default {
  name: 'Canvas_001',
  props: {
    name: String,
    room: Object
  },
  components: {
  },
  created () {
  },
  data () {
    return {
      socketer: new WebSocketer(this.messageCall),
      danmukArry: [],
      links: [
      ],
      cur: 0,
      init: '0'
    }
  },
  methods: {
    show () {
      console.info('查看', this.init, this.name, this.item)
    },
    webConnect () {
      if (!this.socketer.socket.send) {
        this.socketer.connect(this.room.roomId, this.room.title)
      }
    },
    webDisconnect () {
      this.socketer.socket.close()
      this.socketer.socket = {}
    },
    webAccept () {
      var obj = {
        cmd: 'DANMUK_MSG',
        data: {
          roomId: this.room.roomId
        }
      }
      this.socketer.send(JSON.stringify(obj))
    },
    messageCall (data) {
      this.danmukArry = data
    },
    webReset () {
      var obj = {
        cmd: 'DANMUK_MSG_RESET_PROGRESS',
        data: {
          roomId: this.room.roomId,
          base: 0
        }
      }
      this.socketer.send(JSON.stringify(obj))
    }
  },
  mounted () {
    console.info('挂载', this.init, this.name)
  },
  unmounted () {
    console.info('卸载', this.init, this.name)
  }
}
</script>

<style scoped>
div.content {
  width: 200px;
  height: 200px;
  /* margin-left: 100px; */
  border: 1px solid #000;
}

div.danmuk ul,
div.danmuk ul li {
  padding: 0;
  margin: 0;
  text-align: left;
  list-style: none;
}
button.error-status {
  border: 0;
  width: 16px;
  height: 16px;
  background-color: rgb(255, 12, 12);
}
button.success-status {
  border: 0;
  width: 16px;
  height: 16px;
  background-color: rgb(12, 255, 12);
}
</style>
