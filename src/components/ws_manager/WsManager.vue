<template>
  <div class="ws-content">
    <div class="ws-tools">
      <button v-on:click="load">加载</button>
    </div>
    {{ this.datas }}
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>

import { wsLoad } from '../libs/ws_manager/ws_manager.js'

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
      url_ws_load: 'ws/wsLoad',
      // 初始数据
      datas: [],
    }
  },
  methods: {
    load: function () {
      wsLoad(this.url_ws_load, this.loadSuccess, this.fail)
    },
    loadSuccess: function (data) {
      this.datas = data.data.data
    },
    fail: function (error) {
      console.error(error)
    },
    send: function () {
    },
    menu: function () {
    },
  },
  mounted () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
