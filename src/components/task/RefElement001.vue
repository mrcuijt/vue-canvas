<script setup>
import { ref, onMounted } from 'vue'

// 聲明一個 ref 來存放該元素的引用
// 必須和模板裡的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>