<template>
  <div></div>
</template>
<script>
export default {
  name: 'loadsh',
  data () {
    return {

    }
  },
  mounted () {
    let array = [1, 'a', 'b', 'c', 2, 4]
    // eslint-disable-next-line no-undef
    console.log(_.chunk(array, 2))
  }
}
</script>
