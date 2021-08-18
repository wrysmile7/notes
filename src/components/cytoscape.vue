<template>
  <div id="box">
    <div id="cy"></div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'

export default {
  name: 'cytoscape',
  components: {},
  data () {
    return {
      nodes: [],
      edges: []
    }
  },
  methods: {
    createNode () {
      for (let i = 0; i < 10; i++) {
        this.nodes.push({
          data: {
            id: 'n' + i,
            size: Math.floor(Math.random() * 30) + 20
          },
          position: {
            x: Math.floor(Math.random() * 1000),
            y: Math.floor(Math.random() * 500)
          }
        })
        for (let j = 0; j < 10; j++) {
          this.nodes.push({
            data: {
              id: 'n' + i + j,
              size: Math.floor(Math.random() * 30) + 20
            },
            position: {
              x: Math.floor(Math.random() * 1000),
              y: Math.floor(Math.random() * 500)
            }
          })
        }
      }
    },
    createEdge () {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          this.edges.push({
            data: {
              source: 'n' + i,
              target: 'n' + i + j
            }
          })
        }
      }
    },
    createCytoscape () {
      console.log(this.nodes)
      cytoscape.warnings(false)
      // eslint-disable-next-line no-unused-vars
      const cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        userZoomingEnabled: true, // 滚轮缩放
        textureOnViewport: true,
        hideLabelsOnViewport: true,
        pixelRatio: 1,
        animate: false,
        wheelSensitivity: 0.1,
        autounselectify: false,
        autoungrabify: true,
        layout: {
          name: 'preset', // 节点布局类型'breadthfirst', 'circle', 'concentric', 'cose', 'grid','null', 'preset', 'random'
          directed: true
        },
        // layout: options,
        zoom: 1,
        minZoom: 0.3,
        style: [
          {
            selector: 'node',
            style: {
              'content': 'data(id)',
              'text-opacity': 0.5,
              'height': 'data(size)',
              'width': 'data(size)',
              'pie-size': '100%',
              'text-valign': 'top',
              'text-halign': 'center',
              'background-color': '#e8747c',
              'background-image': 'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
              'background-repeat': 'no-repeat',
              // 'background-clip': 'none',
              'background-fit': 'cover',
              'border-color': '#000',
              'border-width': 3,
              'border-opacity': 0.5
            }
          },
          {
            selector: 'node:selected',
            css: {
              'background-color': '#ff6a51',
              'color': '#ff6a51',
              'border-color': '#ff6a51'
            }
          },
          // 线路默认样式
          {
            selector: 'edge',
            style: {
              'width': 3,
              'label': 'data(label)',
              'target-arrow-shape': 'triangle', // 箭头样式 triangle,triangle-tee,circle-triangle,triangle-cross,triangle-backcurve,vee,tee,square,circle,diamond,chevron,none
              'target-arrow-fill': 'hollow', // 箭头填充 实心filled,空心hollow
              'line-color': 'rgb(63, 206, 241)',
              'target-arrow-color': 'rgb(63, 206, 241)',
              'curve-style': 'taxi', // 连接线样式 haystack,bezier,unbundled-bezier,segments,taxi,straight
              'line-style': 'dashed' // 线路样式
            }
          },
          // 线路选中后样式
          {
            selector: 'edge:selected',
            style: {
              'line-color': '#ff6a51',
              'target-arrow-color': '#ff6a51'
            }
          }

        ],
        elements: {
          // 节点数据
          nodes: this.nodes,
          //
          edges: this.edges
        },
        ready: function () {
          this.on('select', 'node', function (evt) {
            console.log(evt.target.data())
          })
        }
      })
    }
  },
  mounted () {
    this.createNode()
    this.createEdge()
    this.createCytoscape()
  }
}

</script>

<style>

  #box {
    width: 100%;
    background: rgb(238, 238, 238);
  }

  #cy {
    width: 100%;
    height: 900px;
  }

</style>
