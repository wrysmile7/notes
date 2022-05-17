<template>
  <div id="box">
    <div id="cy"></div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import gridGuide from 'cytoscape-grid-guide'
import dagre from 'cytoscape-dagre'

cytoscape.use(dagre)
gridGuide(cytoscape)

export default {
  name: 'cytoscape',
  components: {},
  data () {
    return {
      nodes: [],
      edges: [],
      options: {
        // On/Off Modules
        /* From the following four snap options, at most one should be true at a given time */
        snapToGridOnRelease: true, // Snap to grid on release
        snapToGridDuringDrag: false, // Snap to grid during drag
        snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
        snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
        distributionGuidelines: false, // Distribution guidelines
        geometricGuideline: false, // Geometric guidelines
        initPosAlignment: false, // Guideline to initial mouse position
        centerToEdgeAlignment: false, // Center to edge alignment
        resize: false, // Adjust node sizes to cell sizes
        parentPadding: false, // Adjust parent sizes to cell sizes by padding
        drawGrid: true, // Draw grid background

        // General
        gridSpacing: 20, // Distance between the lines of the grid.
        snapToGridCenter: true, // Snaps nodes to center of gridlines. When false, snaps to gridlines themselves. Note that either snapToGridOnRelease or snapToGridDuringDrag must be true.

        // Draw Grid
        zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
        panGrid: false, // Determines whether the grid should move then the user moves the graph if grid is drawn.
        gridStackOrder: -1, // Namely z-index
        gridColor: '#dedede', // Color of grid lines
        lineWidth: 1.0, // Width of grid lines

        // Guidelines
        guidelinesStackOrder: 4, // z-index of guidelines
        guidelinesTolerance: 2.00, // Tolerance distance for rendered positions of nodes' interaction.
        guidelinesStyle: { // Set ctx properties of line. Properties are here:
          strokeStyle: '#8b7d6b', // color of geometric guidelines
          geometricGuidelineRange: 400, // range of geometric guidelines
          range: 100, // max range of distribution guidelines
          minDistRange: 10, // min range for distribution guidelines
          distGuidelineOffset: 10, // shift amount of distribution guidelines
          horizontalDistColor: '#ff0000', // color of horizontal distribution alignment
          verticalDistColor: '#00ff00', // color of vertical distribution alignment
          initPosAlignmentColor: '#0000ff', // color of alignment to initial mouse location
          lineDash: [0, 0], // line style of geometric guidelines
          horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
          verticalDistLine: [0, 0], // line style of vertical distribution guidelines
          initPosAlignmentLine: [0, 0] // line style of alignment to initial mouse position
        },
        // Parent Padding
        parentSpacing: -1 // -1 to set paddings of parents to gridSpacing
      }
    }
  },
  methods: {
    createNode () {
      for (let i = 0; i < 3; i++) {
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
        for (let j = 0; j < 3; j++) {
          this.nodes.push({
            data: {
              id: 'n' + i + j,
              size: Math.floor(Math.random() * 30) + 20
              // parent: 'n' + Math.floor(Math.random() * 10)
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
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
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
        autoungrabify: false, // 是否禁止拖动节点,为true时禁止拖动，默认为false
        userPanningEnabled: true, // 是否启动背景平移,为false时禁止平移,默认为true
        layout: {
          name: 'dagre', // 节点布局类型'breadthfirst', 'circle', 'concentric', 'cose', 'grid','null', 'preset', 'random'
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
          {
            selector: ':parent',
            css: {
              'text-valign': 'top',
              'text-halign': 'center'
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
          // this.gridGuide({
          //   drawGrid: true,
          //   gridColor: 'red'
          // })
        }
      })
      // cy.gridGuide(this.options)
      // console.log(dagre)
      // dagre.layout(cy)
      // cy.animate({
      //   pan: { x: 100, y: 100 },
      //   zoom: 2
      // }, {
      //   duration: 1000
      // })
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
