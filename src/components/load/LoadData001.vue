<template>
  <div>
    <button v-on:click="add">添加</button>
    <button v-on:click="remove">删除</button>
    <button v-on:click="init">初始化</button>
    <button v-on:click="modify">修改1</button>
    <!-- <data-item :name="name"> </data-item> -->
    <data-item
      v-for="item in datas"
      :key="item"
      :name="item"
    ></data-item>
  </div>
</template>

<script>

import DataItem from './DataItem.vue'

export default {
  name: 'Canvas_001',
  components: {
    DataItem
  },
  created () {
  },
  data () {
    return {
      name: '张三',
      datas: ['1', '2', '3'],
    }
  },
  methods: {
    add: function () {
      console.info('demo')
      this.datas.push((this.datas.length + 1) + '')
    },
    remove: function () {
      this.datas.shift()
    },
    init: function () {
      this.datas = ['2', '3', '4']
    },
    modify: function () {
      this.datas[0] = '99'
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
