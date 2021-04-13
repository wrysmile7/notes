 <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="item"
        :label="fanyi(item)"
        width="180"
        v-for="item in tableConfig"
        :key="item"
      >
      </el-table-column>
      <!-- <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { fanyi } from '../utils/tools'
export default {
  name: 'TableExp',
  data () {
    return {
      fanyi: fanyi,
      fanyiData: {
        date: '日期',
        name: '名称',
        address: '地址'
      },
      tableConfig: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.tableConfig = Object.keys(this.tableData[0])
  },
  mounted () {
  },
  methods: {
  }
}
</script>
