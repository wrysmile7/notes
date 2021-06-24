<template>
  <div class="wrap">
    <div class="head">
      <p>分数:<span>{{score}}</span></p>
      <p>难度:<span>{{level}}</span></p>
    </div>
    <div class="box">
      <canvas class="canvas" id="canvas" width="350" height="350"></canvas>
      <div class="mask" v-show="!gameStatus">
        <p>游戏结束</p>
        <el-button @click="gameStart()">重新开始</el-button>
      </div>
    </div>
    <el-button @click="gameStart()" :disabled="btnStatus">开始游戏</el-button>
    <div class="btn-group">
      <el-button v-for="item in btnGroup" :key="item.keyCode" @click="handleKeyDown(item)">{{item.name}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'snake',
  data () {
    return {
      btnGroup: [
        {
          name: '上',
          keyCode: 38
        },
        {
          name: '下',
          keyCode: 40
        },
        {
          name: '左',
          keyCode: 37
        },
        {
          name: '右',
          keyCode: 39
        }
      ],
      score: 0,
      level: 1,
      gameInterval: null,
      block_size: 17.5,
      block_count: 20,
      speed: 500,
      snake: {
        body: [
          {x: this.block_count / 2, y: this.block_count / 2}
        ],
        size: 1,
        direction: {x: 0, y: -1},
        keycode: 38
      },
      apple: {},
      canvas: null, // 画布
      context: null, // 画布的context
      gameStatus: true, // 当前游戏状态
      btnStatus: false
    }
  },
  watch: {
    score: {
      handler (val) {
        this.level = Math.ceil(Math.random() * 7)
        this.speed = 500 - (this.level * 50)
        clearInterval(this.gameInterval)
        this.gameInterval = setInterval(() => {
          this.gameRoutine()
        }, this.speed)
        // this.level = Math.floor(val / 2) + 1
      }
    },
    level: {
      handler (val) {
        // if (this.spee !== 150) {
        //   this.speed -= 50
        //   clearInterval(this.gameInterval)
        //   this.gameInterval = setInterval(() => {
        //     this.gameRoutine()
        //   }, this.speed)
        // }
      }
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvas') // 取画布
    this.context = this.canvas.getContext('2d') // 取得画布的context
    // 建立事件监听器
    document.onkeydown = (e) => {
      this.handleKeyDown(e)
    }
  },
  methods: {
    gameStart () {
      console.log('游戏开始')
      this.gameStatus = true
      this.btnStatus = true
      this.snake = {
        body: [
          {x: this.block_count / 2, y: this.block_count / 2}
        ],
        size: 3,
        direction: {x: 0, y: -1},
        keycode: 38
      }
      this.gameInterval = setInterval(() => {
        this.gameRoutine()
      }, this.speed)
      this.appleCoord()
    },
    gameRoutine () {
      // 判断蛇是否吃到苹果
      if (this.snake.body[0].x === this.apple.x && this.snake.body[0].y === this.apple.y) {
        this.snake.size++
        this.score++
        this.appleCoord()
      }
      // 监听蛇是否死掉
      if (!this.snakeIsDead()) {
        this.moveSnack() // 蛇移动
        this.updateCanvas() // 更新画布
      } else {
        this.gameover() // 游戏结束
      }
    },
    updateCanvas () {
      this.context.fillStyle = 'black' // 用黑色填满
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height) // 填充的范围
      // 画苹果
      this.putApple()
      // 为每一个格子填充颜色
      for (let i = 0; i < this.snake.body.length; i++) {
        this.context.fillStyle = 'green' // 用绿色画蛇
        this.context.fillRect(
          this.snake.body[i].x * this.block_size + 1,
          this.snake.body[i].y * this.block_size + 1,
          this.block_size - 1,
          this.block_size - 1
        )
      }
    },
    // 蛇移动
    moveSnack () {
      var newBlock = {
        x: this.snake.body[0].x + this.snake.direction.x, // 新区块 x坐标
        y: this.snake.body[0].y + this.snake.direction.y // 新区块 y坐标
      }

      this.snake.body.unshift(newBlock) // 加在数组最前面

      while (this.snake.body.length > this.snake.size) {
        this.snake.body.pop() // 蛇移动后 尾巴断掉
      }
    },
    // 键盘控制蛇移动方向
    handleKeyDown (event) {
      // keycode:  ←37 ↑38 →39 ↓40
      if (event.keyCode === 37 && this.snake.keycode !== 39) {
        this.snake.direction.x = -1
        this.snake.direction.y = 0
        this.snake.keycode = 37
      } else if (event.keyCode === 38 && this.snake.keycode !== 40) {
        this.snake.direction.x = 0
        this.snake.direction.y = -1
        this.snake.keycode = 38
      } else if (event.keyCode === 39 && this.snake.keycode !== 37) {
        this.snake.direction.x = 1
        this.snake.direction.y = 0
        this.snake.keycode = 39
      } else if (event.keyCode === 40 && this.snake.keycode !== 38) {
        this.snake.direction.x = 0
        this.snake.direction.y = 1
        this.snake.keycode = 40
      }
    },
    // 判断蛇是否死了
    snakeIsDead () {
    // 碰墙
      if (this.snake.body[0].x < 0) {
        return true
      } else if (this.snake.body[0].x > this.block_count) {
        return true
      } else if (this.snake.body[0].y < 0) {
        return true
      } else if (this.snake.body[0].y >= this.block_count) {
        return true
      }
      // 撞身体
      for (let i = 1; i < this.snake.body.length; i++) {
        if (this.snake.body[0].x === this.snake.body[i].x &&
            this.snake.body[0].y === this.snake.body[i].y) {
          return true
        }
      }
      // 都没撞，没死...
      return false
    },
    // 游戏结束
    gameover () {
    // 停止更新画布
      clearInterval(this.gameInterval)
      this.gameStatus = false
      this.level = 0
      this.score = 0
      console.log('游戏结束')
    },
    // 生成苹果坐标
    appleCoord () {
      // 随机放置苹果
      this.apple = {
        x: Math.floor(Math.random() * this.block_count),
        y: Math.floor(Math.random() * this.block_count)
      }
      // 判断苹果有没有放在蛇身上
      for (var i = 0; i < this.snake.body.length; i++) {
        if (this.snake.body[i].x === this.apple.x &&
            this.snake.body[i].y === this.apple.y) {
          this.appleCoord()
          break
        }
      }
    },
    // 画苹果
    putApple () {
      this.context.fillStyle = 'red'
      this.context.fillRect(
        this.apple.x * this.block_size + 1,
        this.apple.y * this.block_size + 1,
        this.block_size - 1,
        this.block_size - 1
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  .head{
    display: flex;
    >p{
      margin: 20px 20px 0 20px;
    }
  }
  .box{
    width: 350px;
    height: 350px;
    margin: 20px auto;
    position: relative;
    .canvas{
      background: rgba($color: #000000, $alpha: 0.8);
      border-radius: 3px;
    }
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba($color: #ffffff, $alpha: 0.5);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      >p{
        font-size: 48px;
        font-weight: bold;
        color: rgb(163, 18, 18);
      }
    }
  }
  .btn-group{
    width: 150px;
    height: 150px;
    position: relative;
    margin-top: 20px;
    button{
      height: 50px;
      width: 50px;
      padding: 0;
      margin: 0;
      text-align: center;
      line-height: 50px;
      font-size: 24px;
      position: absolute;
      &:nth-child(1){
        top: 0;
        left: 50px;
      }
      &:nth-child(2){
        bottom: 0;
        left: 50px;
      }
      &:nth-child(3){
        top: 50px;
        left: 0;
      }
      &:nth-child(4){
        top: 50px;
        right: 0;
      }
    }
  }
}
</style>
