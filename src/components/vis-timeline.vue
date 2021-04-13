<template>
  <div>
    <div id="visualization"></div>
    <div id="log"></div>
  </div>
</template>
<script>
import vis from 'vis'
import swal from 'sweetalert2'
export default {
  name: 'VisTimeline',
  data () {
    return {
      groups: new vis.DataSet([
        {
          content: 'Formula E',
          id: 'Formula E',
          value: 1,
          className: 'openwheel'
        },
        { content: 'WRC', id: 'WRC', value: 2, className: 'rally' },
        { content: 'MotoGP', id: 'MotoGP', value: 3, className: 'motorcycle' },
        { content: 'V8SC', id: 'V8SC', value: 4, className: 'touringcars' },
        { content: 'WTCC', id: 'WTCC', value: 5, className: 'touringcars' },
        { content: 'F1', id: 'F1', value: 6, className: 'openwheel' },
        { content: 'SBK', id: 'SBK', value: 7, className: 'motorcycle' },
        { content: 'IndyCar', id: 'IndyCar', value: 8, className: 'openwheel' },
        {
          content: 'MotoAmerica',
          id: 'MotoAmerica',
          value: 9,
          className: 'motorcycle'
        },
        { content: 'SGP', id: 'SGP', value: 10, className: 'rally' },
        { content: 'EWC', id: 'EWC', value: 11, className: 'endurance' },
        { content: 'BSB', id: 'BSB', value: 12, className: 'motorcycle' },
        { content: 'DTM', id: 'DTM', value: 13, className: 'touringcars' },
        { content: 'BTCC', id: 'BTCC', value: 14, className: 'touringcars' },
        { content: 'WorldRX', id: 'WorldRX', value: 15, className: 'rally' },
        { content: 'WSR', id: 'WSR', value: 16, className: 'openwheel' },
        { content: 'Roads', id: 'Roads', value: 17, className: 'motorcycle' },
        { content: 'WEC', id: 'WEC', value: 18, className: 'endurance' },
        { content: 'GP2', id: 'GP2', value: 19, className: 'openwheel' }
      ])
    }
  },
  mounted () {
    // note that months are zero-based in the JavaScript Date object, so month 3 is April
    var items = new vis.DataSet([
      { id: 1, content: 'item 1', start: new Date(2013, 3, 20) },
      { id: 2, content: 'item 2', start: new Date(2013, 3, 14) },
      { id: 3, content: 'item 3', start: new Date(2013, 3, 18) },
      {
        id: 4,
        content: 'item 4',
        start: new Date(2013, 3, 16),
        end: new Date(2013, 3, 19)
      },
      { id: 5, content: 'item 5', start: new Date(2013, 3, 25) },
      { id: 6, content: 'item 6', start: new Date(2013, 3, 27) }
    ])

    var min = new Date(2013, 3, 1) // 1 april
    var max = new Date(2013, 3, 30, 23, 59, 59) // 30 april

    var container = document.getElementById('visualization')
    var options = {
      editable: true,

      onAdd: function (item, callback) {
        prettyPrompt(
          'Add item',
          'Enter text content for new item:',
          item.content,
          function (value) {
            console.log(value)
            if (value) {
              item.content = value
              callback(item) // send back adjusted new item
            } else {
              callback(null) // cancel item creation
            }
          }
        )
      },

      onMove: function (item, callback) {
        var title =
          'Do you really want to move the item to\n' +
          'start: ' +
          item.start +
          '\n' +
          'end: ' +
          item.end +
          '?'

        prettyConfirm('Move item', title, function (ok) {
          if (ok) {
            callback(item) // send back item as confirmation (can be changed)
          } else {
            callback(null) // cancel editing item
          }
        })
      },

      onMoving: function (item, callback) {
        if (item.start < min) item.start = min
        if (item.start > max) item.start = max
        if (item.end > max) item.end = max

        callback(item) // send back the (possibly) changed item
      },

      onUpdate: function (item, callback) {
        prettyPrompt('Update item', 'Edit items text:', item.content, function (
          value
        ) {
          if (value) {
            item.content = value
            callback(item) // send back adjusted item
          } else {
            callback(null) // cancel updating the item
          }
        })
      },

      onRemove: function (item, callback) {
        prettyConfirm(
          'Remove item',
          'Do you really want to remove item ' + item.content + '?',
          function (ok) {
            if (ok) {
              callback(item) // confirm deletion
            } else {
              callback(null) // cancel deletion
            }
          }
        )
      }
    }
    // eslint-disable-next-line no-unused-vars
    var timeline = new vis.Timeline(container, items, options)

    items.on('*', function (event, properties) {
      logEvent(event, properties)
    })

    function logEvent (event, properties) {
      var log = document.getElementById('log')
      var msg = document.createElement('div')
      msg.innerHTML =
        'event=' +
        JSON.stringify(event) +
        ', ' +
        'properties=' +
        JSON.stringify(properties)
      log.firstChild
        ? log.insertBefore(msg, log.firstChild)
        : log.appendChild(msg)
    }

    function prettyConfirm (title, text, callback) {
      swal
        .fire({
          title: title,
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55'
        })
        .then(val => {
          return callback(val.value)
        })
    }

    function prettyPrompt (title, text, inputValue, callback) {
      swal
        .fire({
          title: title,
          text: text,
          input: 'text',
          showCancelButton: true,
          inputValue: inputValue
        })
        .then(val => {
          return callback(val.value)
        })
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
body,
html {
  font-family: arial, sans-serif;
  font-size: 11pt;
}

#visualization {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
}

.vis-item.openwheel {
  background-color: #b0e2ff;
}
.vis-item.rally {
  background-color: #eaeaea;
}
.vis-item.motorcycle {
  background-color: #fa8072;
}
.vis-item.touringcar {
  background-color: #b4eeb4;
}
.vis-item.endurance {
  background-color: #ffffcc;
}
</style>
