<template>
  <div>
    <div>
      {{ taskNo }}
      <br />
      {{ this.taskConfig }}
      <br />
      <input
        key="name"
        v-model="taskNo"
      />
      <button
        type="button"
        v-on:click="load"
      >加载</button>
    </div>
    <table>
      <tr>
        <td><span>编号</span>：</td>
        <td><span>{{ taskConfig.tno }}</span></td>
      </tr>
      <tr>
        <td><span>名称</span>：</td>
        <td><span>{{ taskConfig.name }}</span></td>
      </tr>
      <tr>
        <td><span>类型</span>：</td>
        <td><span>{{ taskConfig.type }}</span></td>
      </tr>
      <tr>
        <td><span>本地后缀</span>：</td>
        <td><span>{{ taskConfig.suffixLocal }}</span></td>
      </tr>
      <tr>
        <td><span>远程后缀</span>：</td>
        <td><span>{{ taskConfig.suffixRemote }}</span></td>
      </tr>
      <tr>
        <td><span>预期数</span>：</td>
        <td><span>{{taskConfig.expectedNum}}</span></td>
      </tr>
      <tr>
        <td><span>增量数</span>：</td>
        <td><span>{{taskConfig.increment}}</span></td>
      </tr>
      <tr>
        <td><span>实际数</span>：</td>
        <td><span>{{taskConfig.actualNum}}</span></td>
      </tr>
      <tr>
        <td><span>任务状态</span>：</td>
        <td><span>{{taskConfig.state}}</span></td>
      </tr>
      <tr>
        <td><span>数据状态</span>：</td>
        <td><span>{{taskConfig.dataState}}</span></td>
      </tr>
      <tr>
        <td><span>预期状态</span>：</td>
        <td><span>{{taskConfig.expectedState}}</span></td>
      </tr>
      <tr>
        <td><span>批量状态</span>：</td>
        <td><span>{{taskConfig.batchState}}</span></td>
      </tr>
      <tr>
        <td><span>人工复核</span>：</td>
        <td><span>{{taskConfig.manualState}}</span></td>
      </tr>
      <tr>
        <td><span>插入日期</span>：</td>
        <td><span>{{taskConfig.inputDate}}</span></td>
      </tr>
      <tr>
        <td><span>插入时间</span>：</td>
        <td><span>{{taskConfig.inputTime}}</span></td>
      </tr>
      <tr>
        <td><span>更新日期</span>：</td>
        <td><span>{{taskConfig.updateDate}}</span></td>
      </tr>
      <tr>
        <td><span>更新时间</span>：</td>
        <td><span>{{taskConfig.updateTime}}</span></td>
      </tr>
    </table>
    <div>
      <div style="width: 100px; height: 100px; overflow: scroll;">
        <img src="https://youimg1.c-ctrip.com/target/010341200061sysx2A203_D_10000_1200.jpg?proc=autoorient"/>
      </div>
    </div>
  </div>
</template>

<script>

import { api } from '../../api/axios'

class TmTaskConfig {
  constructor() {
    this.tno = '100'
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
    load: function (e) {
      console.log('对象修改了', e)
      this.taskConfig.tno = this.taskNo
      var promise = api.postJson('http://127.0.0.1:8600/tools/task/load', this.taskConfig)
      var _datas = this.datas
      var _taskConfig = this.taskConfig
      promise.then(function (resp) {
        Object.assign(_datas, resp.data.data)
        Object.assign(_taskConfig, resp.data.data)
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
