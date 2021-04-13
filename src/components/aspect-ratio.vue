<template>
  <div>
    <div class="box"></div>
  </div>
</template>
<script>
export default {
  name: 'AspectRatio'
}
</script>
<style scoped>
.box{
  background: red;
  width: 400px;
  height: auto;
  aspect-ratio: 2/1;
}
</style>
