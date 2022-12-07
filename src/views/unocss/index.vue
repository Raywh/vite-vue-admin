<template>
  <div class="main">
    查询报表接口 curl "http://127.0.0.1:8077/api/v1/QAMarkRecord/report?page_id=1&num_per_page=10&type=qa
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="_id" label="ID" align="center" />
      <el-table-column prop="name" label="Name" align="center" />
      <el-table-column prop="reasonable_count" label="合理数" align="center" />
      <el-table-column prop="reasonable_count" label="合理率" align="center" :formatter="reasonableCountPass" />
      <el-table-column prop="unreasonable_count" label="不合理数" align="center" />
      <el-table-column prop="unreasonable_count" label="不合理数率" align="center" :formatter="unreasonableCountPass" />
    </el-table>

    <el-pagination
      v-model:current-page="pageOptions.currentPage"
      v-model:page-size="pageOptions.pageSize"
      :page-sizes="pageOptions.PageSizeArr"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageOptions.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"

import { QAMarkRecordReport } from "@/api/table"
const pageOptions = reactive({
  currentPage: 1,
  pageSize: 10,
  PageSizeArr: [10, 20, 30, 40, 50, 60, 70, 80, 100],
  total: 0
})

const tableData = ref()

const getTable = async () => {
  const params = {
    num_per_page: 10,
    page_id: 1,
    type: "qa"
  }
  const res: any = await QAMarkRecordReport(params)
  console.log(res)
  if (res.code === 0) {
    // tableData.value = res.data
    tableData.value = [
      {
        reasonable_count: 1,
        unreasonable_count: 9,
        name: "Tom",
        _id: "a"
      },
      {
        reasonable_count: 20,
        unreasonable_count: 80,
        name: "Tomb",
        _id: "x"
      }
    ]
    pageOptions.total = tableData.value.length
  } else {
    ElMessage(res.message || "加载异常")
  }
}

getTable()
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageOptions.pageSize = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  pageOptions.currentPage = val
}
const reasonableCountPass = (row: any) => {
  const allCount = row.unreasonable_count + row.reasonable_count
  return countPass(row.reasonable_count, allCount)
}

const unreasonableCountPass = (row: any) => {
  const allCount = row.unreasonable_count + row.reasonable_count
  return countPass(row.unreasonable_count, allCount)
}
const countPass = (val: number, allCount: number) => {
  console.log(val)
  return ((val / allCount) * 100).toFixed(2) + "%"
}
</script>

<style scoped>
.main {
  margin: 10px;
}
</style>
