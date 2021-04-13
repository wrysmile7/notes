<template>
  <div class="wrap">
    <!-- <el-button-group>
      <el-button type="primary" v-for="item in buttonConfig" :key="item" @click="linkTo(item)">{{item}}</el-button>
    </el-button-group>
    <button @click="reCreated()">aaa</button> -->
    <div
      class="light"
      v-for="item in buttonConfig"
      :key="item"
      @click="linkTo(item)"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      buttonConfig: [
        'xlsx',
        'tables',
        'loadsh',
        'carousel',
        'aspectratio',
        'vis-network',
        'vis-timeline',
        'vis-graph3d'
      ]
    }
  },
  created () {
    console.log(123)
  },
  mounted () {
    let a = [{ s: 1 }, { g: 2 }]
    let b = [{ y: 3 }, { t: 4 }]
    a = a.concat(b)
    console.log(a)
  },
  methods: {
    linkTo (name) {
      this.$router.push(name)
    },
    reCreated () {
      this.$options['created'].forEach(val => {
        val.call(this)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-around;
  .light {
    width: fit-content;
    position: relative;
    padding: 15px 20px;
    color: #03e9f4;
    font-size: 18px;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    cursor: pointer;
    overflow: hidden;
    animation: animatecolor 2s linear infinite;
    &:hover {
      background-color: #03e9f4;
      color: #050801;
      box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
        0 0 200px #03e9f4;
    }
    div {
      position: absolute;
      &:nth-child(1) {
        width: 100%;
        height: 2px;
        top: 0;
        left: -100%;
        background: linear-gradient(to right, transparent, #03e9f4);
        animation: animate1 1s linear infinite;
      }
      &:nth-child(2) {
        width: 2px;
        height: 100%;
        top: -100%;
        right: 0;
        background: linear-gradient(to bottom, transparent, #03e9f4);
        animation: animate2 1s linear infinite;
        animation-delay: 0.25s;
      }
      &:nth-child(3) {
        width: 100%;
        height: 2px;
        bottom: 0;
        right: -100%;
        background: linear-gradient(to left, transparent, #03e9f4);
        animation: animate3 1s linear infinite;
        animation-delay: 0.5s;
      }
      &:nth-child(4) {
        width: 2px;
        height: 100%;
        bottom: -100%;
        left: 0;
        background: linear-gradient(to top, transparent, #03e9f4);
        animation: animate4 1s linear infinite;
        animation-delay: 0.75s;
      }
    }
  }
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
@keyframes animatecolor {
  0% {
    filter:hue-rotate(0deg)
  }
  25% {
    filter:hue-rotate(90deg)
  }
  50% {
    filter:hue-rotate(180deg)
  }
  75% {
    filter:hue-rotate(270deg)
  }
  100% {
    filter:hue-rotate(360deg)
  }
}
</style>
