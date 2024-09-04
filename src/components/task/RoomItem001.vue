<template>
  <div class="content">
    <div class="operator">
      <button>启动</button>
      <button>停止</button>
      <button>移除</button>
    </div>
    <div class="title">
      <div class="room">30032</div>
      <div class="live-up">雪球</div>
      <div class="live-title">晚上好！</div>
      <div class="status"><button class="success-status"></button>Running</div>
    </div>
    <div class="danmuk">
      <ul>
        <li>晚上好</li>
        <li>晚上好！</li>
        <li>晚上好！！</li>
        <li>晚上好！！！</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Canvas_001',
  props: {
    name: String,
    item: Object
  },
  components: {
  },
  created () {
  },
  data () {
    return {
      links: [
      ],
      cur: 0,
      init: '0'
    }
  },
  methods: {
    show () {
      console.info('查看', this.init, this.name, this.item)
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
