import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import XlsxExp from '@/components/xlsx-exp'
import TableExp from '@/components/table-exp'
import LoadshExp from '@/components/loadsh-exp'
import CarouselExp from '@/components/carousel-exp'
import AspectRatio from '@/components/aspect-ratio'
import VisNetwork from '@/components/vis-network'
import VisTimeline from '@/components/vis-timeline'
import VisGraph3d from '@/components/vis-graph3d'
import Snake from '@/components/snake'
import Cytoscape from '@/components/cytoscape'
import rating from '@/components/rating'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/xlsx',
      name: 'XlsxExp',
      component: XlsxExp
    },
    {
      path: '/tables',
      name: 'TableExp',
      component: TableExp
    },
    {
      path: '/loadsh',
      name: 'LoadshExp',
      component: LoadshExp
    },
    {
      path: '/carousel',
      name: 'CarouselExp',
      component: CarouselExp
    },
    {
      path: '/aspectratio',
      name: 'AspectRatio',
      component: AspectRatio
    },
    {
      path: '/vis-network',
      name: 'VisNetwork',
      component: VisNetwork
    },
    {
      path: '/vis-timeline',
      name: 'VisTimeline',
      component: VisTimeline
    },
    {
      path: '/vis-graph3d',
      name: 'VisGraph3d',
      component: VisGraph3d
    },
    {
      path: '/snake',
      name: 'Snake',
      component: Snake
    },
    {
      path: '/cytoscape',
      name: 'Cytoscape',
      component: Cytoscape
    },
    {
      path: '/rating',
      name: 'rating',
      component: rating
    }
  ]
})
