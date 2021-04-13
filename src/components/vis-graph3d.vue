<template>
  <div>
    <div id="mygraph"></div>
    <div id="info"></div>
  </div>
</template>
<script>
import vis from 'vis'
export default {
  name: 'VisGraph3d',
  data () {
    return {
      data: null,
      graph: null
    }
  },
  mounted () {
    this.drawVisualization()
  },
  methods: {
    drawVisualization () {
      // Create and populate a data table.
      let data = new vis.DataSet()
      // create some nice looking data with sin/cos
      let steps = 20 // number of datapoints will be steps*steps
      let axisMax = 314
      let axisStep = axisMax / steps
      for (let x = 0; x < axisMax; x += axisStep) {
        for (let y = 0; y < axisMax; y += axisStep) {
          let value = this.custom(x, y)
          data.add({
            x: x,
            y: y,
            z: value,
            style: value
          })
        }
      }

      // specify options
      let options = {
        width: '600px',
        height: '600px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
      }

      // create a graph3d
      let container = document.getElementById('mygraph')
      this.graph = new vis.Graph3d(container, data, options)
    },
    onclick (point) {
      console.log(point)
    },
    custom (x, y) {
      return (Math.sin(x / 50) * Math.cos(y / 50) * 50 + 50)
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  font: 10pt arial;
}
</style>
