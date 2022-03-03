<template>
  <div class="app bg-gray-800">
    <Screen prop-test="sdilfhads">{{}}</Screen>
    <div class="content">
      <Menu @select="selectedMenu=$event"></Menu>
      <Palette v-if="selectedMenu=='palette'"></Palette>
      <Option v-if="selectedMenu=='option'"></Option>
      <Download v-if="selectedMenu=='download'" title="download menu"></Download>
    </div>
  </div>
</template>
<script setup lang="ts">
import Screen from './components/Screen.vue'
import Menu from './components/Menu.vue'
import Palette from './views/Palette.vue'
import Option from './views/Option.vue'
import Download from './views/Download.vue'

import { Solid } from './models/solids/solid'

</script>
<script lang="ts">

export default {
  name: "app",
  components: [
    Screen,
    Menu,
    Palette,
    Option,
    Download,
  ],
  created() {},
  data() {
    return {
      selectedMenu: 'palette',
    };
  },
  props: {},
  methods: {},
}
</script>
<style>
@media screen and (orientation:portrait) { 
  *{
    --orientation: column;
  }
}
@media screen and (orientation:landscape) { 
  *{
    --orientation: row;
  }
}
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app{
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: var(--orientation);

  align-items: center;
  justify-content: center;
}
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
