<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Canvas001 />
</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue' */
/* import Canvas001 from './components/canvas/canvas205.vue' */
/* import Canvas001 from './components/task/VerifyTask002.vue' */
/* import Canvas001 from './components/task/AddTask001.vue' */
/* import Canvas001 from './components/task/ViewTask001.vue' */
/* import Canvas001 from './components/load/LoadData002.vue' */
/* import Canvas001 from './components/task/WebSocket005.vue' */
import Canvas001 from './components/ws_manager/WsManager.vue'

export default {
  name: 'App',
  components: {
    Canvas001
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
