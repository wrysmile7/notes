/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import vueXlsxTable from 'vue-xlsx-table'
import loadsh from 'lodash'
// import { useSocket } from './websocket'
// useSocket()
import VueNativeSock from 'vue-native-websocket'
import "vis/dist/vis.css"

import 'sweetalert2/src/sweetalert2.scss'
// import { Timeline } from 'vis-network'
// Vue.component('timeline', Timeline)

// base.lkWebSocket为你服务端websocket地址
// Vue.use(VueNativeSock,base.lkWebSocket,{
//   // 启用Vuex集成,store的值为你的vuex
//   store: store,
//   // 数据发送/接收使用使用json格式
//   format: "json",
//   // 开启自动重连
//   reconnection: true,
//   // 尝试重连的次数
//   reconnectionAttempts: 5,
//   // 重连间隔时间
//   reconnectionDelay: 3000,
//   // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
//   passToStoreHandler: function (eventName, event) {
//   if (!eventName.startsWith('SOCKET_')) { return }
//   let method = 'commit';
//   let target = eventName.toUpperCase();
//   let msg = event;
//   if (this.format === 'json' && event.data) {
//   msg = JSON.parse(event.data);
//   if (msg.mutation) {
//   target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/');
//   } else if (msg.action) {
//   method = 'dispatch';
//   target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/');
//   }
//   }
//   this.store[method](target, msg);
//   this.store.state.socket.message = msg;
//   }
//  });

// Vue.use(vueXlsxTable, { rABS: false }) //Browser FileReader API有两个方法读取本地文件readAsBinaryString和readAsArrayBuffer，默认为rABS false
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
