<template>
  <div class="data-item">{{ name }} | {{ item.name }} | {{ item.id }}
    <button v-on:click="show">查看</button>
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
    console.info('创建', this.init, this.name)
    this.init = this.name
    console.info('创建', this.init, this.name)
  },
  data () {
    return {
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

<style>
div.data-item {
  border: 1px solid #000;
}
</style>
