<template>
  <div class="content">
    <div class="operator">
      <button>启动</button>
      <button v-on:click="previewData">预览</button>
      <button v-on:click="$emit('publish', JSON.parse(JSON.stringify(this.datas)))">下放</button>
    </div>
    <div class="div-content">
      <textarea
        class="text-textarea"
        ref="textarea"
      ></textarea>
    </div>
    <div class="div-preview">
      <pre
        class="text-preview"
        ref="preview"
      ></pre>
      <ul>
        <li
          v-for="item in datas"
          :key="item.roomId"
        >{{ JSON.stringify(item) }} <button v-on:click="remove(item.roomId)">移除</button></li>
      </ul>
    </div>
  </div>
</template>

<script>

import { ref, onMounted } from 'vue'

export default {
  name: 'Canvas_001',
  props: {
    name: String,
    item: Object
  },
  setup () {
    const textarea = ref(null)
    const preview = ref(null)
    // 页面挂载后才能获得
    onMounted(() => { })
    // ...
    return {
      textarea, preview
    }
  },
  components: {
  },
  created () {
  },
  data () {
    return {
      datas: [],
      cur: 0,
      init: '0'
    }
  },
  methods: {
    show () {
      console.info('查看', this.init, this.name, this.item)
    },
    previewData () {
      var lines = this.textarea.value.split('\n')
      var rooms = []
      for (var i = 0; i < lines.length; i++) {
        var items = lines[i].split(' ')
        var room = {
          'roomId': items[0],
          'up': items[1],
          'title': items[2]
        }
        rooms.push(room)
      }
      for (i = 0; i < rooms.length; i++) {
        var flag = false
        for (var j = 0; j < this.datas.length; j++) {
          if (this.datas[j].roomId === rooms[i].roomId) {
            this.datas[j] = rooms[i]
            flag = true
            break
          }
        }
        if (!flag) {
          this.datas.push(rooms[i])
        }
      }
      this.preview.innerText = JSON.stringify(rooms)
    },
    remove (roomId) {
      for (var j = 0; j < this.datas.length; j++) {
        if (this.datas[j].roomId === roomId) {
          this.datas.splice(j, 1)
          j--
          break
        }
      }
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

div.div-preview ul,
div.div-preview ul li {
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
