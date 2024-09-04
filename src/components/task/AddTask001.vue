<template>
  <div>
    <table>
      <tr>
        <td><span>编号</span>：</td>
        <td><input
            name="tno"
            type="input"
            v-model="taskConfig.tno"
          /></td>
      </tr>
      <tr>
        <td><span>名称</span>：</td>
        <td><input
            name="name"
            type="input"
            v-model="taskConfig.name"
          /></td>
      </tr>
      <tr>
        <td><span>类型</span>：</td>
        <td><input
            name="type"
            type="input"
            v-model="taskConfig.type"
          /></td>
      </tr>
      <tr>
        <td><span>本地后缀</span>：</td>
        <td><input
            name="suffixLocal"
            type="input"
            v-model="taskConfig.suffixLocal"
          /></td>
      </tr>
      <tr>
        <td><span>远程后缀</span>：</td>
        <td><input
            name="suffixRemote"
            type="input"
            v-model="taskConfig.suffixRemote"
          /></td>
      </tr>
      <tr>
        <td><span>预期数</span>：</td>
        <td><input
            name="expectedNum"
            type="input"
            v-model="taskConfig.expectedNum"
          /></td>
      </tr>
      <tr>
        <td><span>增量数</span>：</td>
        <td><input
            name="increment"
            type="input"
            v-model="taskConfig.increment"
          /></td>
      </tr>
      <tr>
        <td><span>实际数</span>：</td>
        <td><input
            name="actualNum"
            type="input"
            v-model="taskConfig.actualNum"
          /></td>
      </tr>
      <tr>
        <td><button
            type="submit"
            v-on:click="submit"
          >添加</button></td>
        <td><button type="reset">重置</button></td>
      </tr>
    </table>
    {{ datas }}
  </div>
</template>

<script>

import { api } from '../../api/axios'

class TmTaskConfig {
  constructor() {
    this.tno = ''
    this.name = ''
    this.type = ''
    this.suffixLocal = ''
    this.suffixRemote = ''
    this.expectedNum = ''
    this.increment = ''
    this.actualNum = ''
    this.state = ''
    this.dataState = ''
    this.expectedState = ''
    this.batchState = ''
    this.manualState = ''
    this.inputDate = ''
    this.inputTime = ''
    this.updateDate = ''
    this.updateTime = ''
  }
}

export default {
  name: 'Canvas_001',
  components: {
  },
  created () {
    // this.roundDatas()
    // var promise = api.post('http://127.0.0.1:8600/tools/task/get', {})
    // var this_ = this
    // promise.then(function (data) {
    //   console.info(data.data.data)
    //   this_.taskNo = data.data.data.taskNo
    // })
  },// 侦听器
  watch: {
    // 深度监听
    taskConfig: {
      handler (val) {
        console.log(this.obj)
        console.log('对象修改了', val)
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
      },
      deep: true
    }
  },
  data () {
    return {
      taskNo: '',
      current: 0,
      taskConfig: new TmTaskConfig(),
      datas: {
      }, // 初始数据
    }
  },
  methods: {
    submit: function (e) {
      console.log('对象修改了', e)
      var promise = api.postJson('http://127.0.0.1:8600/tools/task/add', this.taskConfig)
      var _datas = this.datas
      promise.then(function (resp) {
        Object.assign(_datas, resp.data.data)
      }).catch(function (error) {
        console.log(error)
      })
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
