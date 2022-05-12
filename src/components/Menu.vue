<template>
  <div class="h-16 flex items-center justify-center menu flex space-x-4 py-4">
    <AdjustmentsIcon :class="getMenuStyle('palette')" @click="selectTheMenu('palette')"/>
    <CogIcon :class="getMenuStyle('option')" @click="selectTheMenu('option')"/>
    <DownloadIcon :class="getMenuStyle('download')" @click="selectTheMenu('download')"/>
  </div>
</template>

<script>
import { AdjustmentsIcon, CogIcon, DownloadIcon } from '@heroicons/vue/solid'

export default {
  name: "menu",
  created() {},
  data() {
    return {
      selectedMenu: 'palette'
    }
  },
  components: { 
    AdjustmentsIcon, CogIcon, DownloadIcon
  },
  methods: {
    selectTheMenu(name){
      this.$emit('select', name)
      this.selectedMenu = name
    },
    getMenuStyle(name){
      const defaultStyle = 'rounded-full p-2 h-10 w-10 cursor-pointer '
      if(name==this.selectedMenu)
        return defaultStyle + 'bg-gray-900 text-white'
      return defaultStyle + 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }
  },
  mounted() {
  },
}
</script>
<style scoped>
menu{
  width: 100%;
}
</style>
