<!-- vue中xlsx插件例子 -->
<template>
  <div id="app">
    <h1>vue-xlsx-table</h1>
    <!-- <vue-xlsx-table @on-select-file="handleSelectedFile"></vue-xlsx-table> -->
    <button @click="exportFile(tableData, 'thee1', 'test', 'csv')">
      export Csv
    </button>
    <button @click="exportFile(tableData, 'thee1', 'test', 'xls')">
      export Excel
    </button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  name: 'xlsx-exp',
  data () {
    return {
      tableData: [
        ['asd', 123],
        ['zxc', 321]
      ]
    }
  },
  mounted () {
    // this.exportFile(this.tableData, 'thee1', 'test')
  },
  methods: {
    // handleSelectedFile (convertedData) {
    //   console.log(convertedData)
    // },
    exportFile (data, sheetName, fileName, fileType) {
      console.log(data)
      console.log(sheetName)
      console.log(fileName)
      console.log(fileType)
      const ws = XLSX.utils.aoa_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      const wbout = XLSX.write(wb, { type: 'binary', bookType: fileType })
      FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }), fileName + '.' + fileType)
    },
    s2ab (s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    }
  }
}
</script>
<style scoped></style>
