<template>
  <div class="download text-4xl font-bold">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "download",
  created() {},
  data() {
    return {
      
    };
  },
  props: {
    title: String
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.download{
  background-color: lightgreen;
  width: 100%;
  min-width: 200px;
  min-height: 200px;
}
</style>