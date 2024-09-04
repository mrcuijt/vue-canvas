<template>
  <div>
    <button v-on:click="add">添加</button>
    <button v-on:click="remove">删除</button>
    <button v-on:click="init">初始化</button>
    <button v-on:click="modify">修改1</button>
    <!-- <data-item :name="name"> </data-item> -->
    <data-item
      v-for="item in datas"
      :key="item.id"
      :item="item"
      :name="item.name"
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
      datas: [
        { id: '1', name: '张三' },
        { id: '2', name: '李四' },
        { id: '3', name: '王二' }
      ],
    }
  },
  methods: {
    add: function () {
      console.info('demo')
      this.datas.push({ id: (this.datas.length + 1) + '', name: '添加' })
    },
    remove: function () {
      this.datas.shift()
    },
    init: function () {
      this.datas = [
        { id: '2', name: '李四5' },
        { id: '3', name: '王二5' },
        { id: '1', name: '张三5' }
      ]
    },
    modify: function () {
      var obj = { id: '1', name: '张三6' }
      for (var i = 0; i < this.datas.length; i++) {
        var data = this.datas[i]
        if (data.id === obj.id) {
          this.datas[i] = obj
          break
        }
      }
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
