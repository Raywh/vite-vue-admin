<template>
  <div class="main-box">
    <div>
      <!-- <el-select v-model="crudStore.search_type" placeholder="Select" @change="crudStore.commitQuery()">
        <el-option value="mysql" label="标准版" />
        <el-option value="mongo" label="无限播" />
      </el-select> -->
      <el-input v-model="shop_name" placeholder="请输入搜索内容" clearable style="width: 300px; margin-right: 20px" />

      <el-button type="" @click="reload">重 载</el-button>
    </div>

    <el-table :data="tableData" v-loading="t_loading" style="width: 100%; margin-top: 20px" border>
      <el-table-column type="index" label="序号" width="60" align="center" />

      <el-table-column prop="qa_id" label="ID" align="center" width="80" />
      <el-table-column prop="shop_name" label="店铺名称" align="center" width="160" />
      <el-table-column prop="answer_type" label="类型" align="center" width="80" :formatter="formatterAnswerType" />

      <el-table-column prop="question" label="问题" align="center" fit />

      <el-table-column align="center" label="回答" width="650">
        <template #default="props">
          <div v-if="props.row.qa_mark_list && props.row.qa_mark_list.length">
            <div v-for="(row, index) in props.row.qa_mark_list" :key="props.row._id + index" class="answer-content">
              <div class="answer-text0">答案：{{ row.answer }}</div>
              <el-divider direction="vertical" />
              <div class="answer-text">提供者：{{ row.user_name }}</div>
              <el-divider direction="vertical" />
              <div class="answer-text">合理次数：{{ row.reasonable_count || row.reasonable || 0 }}</div>
              <el-divider direction="vertical" />
              <div class="answer-text">不合理次数：{{ row.unreasonable_count || row.unreasonable || 0 }}</div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="创建时间" align="center" width="160" :formatter="formatterCreatTime" />
    </el-table>
    <el-pagination
      v-model:current-page="n_page"
      v-model:page-size="n_size"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"

import { QAMarkRecordApi, getTableDataApi } from "@/api/table"
import dayjs from "dayjs"

interface IRowMeta {
  _id: string
  username: string
  shop_name: string
  email: string
  question: string
  text_answer: string // qa_mark_list -> answer 手风琴
  status: boolean
  createdAt: string
  my_answer?: string
  qa?: any
}
type iStatus = "reasonable" | "unreasonable" | "uncertain"
type iType = "text" | "video" | "fail" | "failed" | "ignore" | "video_Quick" | undefined | ""
interface UpdateQA {
  qa_id: string
  status: string
  answer: string // 合理 以前的、不合理 新增
  from_user_id: string // qa_mark_list 的参数
  from_user_name: string
  my_answer?: string
}

interface IRow {
  answer: string
  my_answer: string
  user_id: string // qa_mark_list 的参数
  user_name: string
}
const n_size = ref(10)
const n_page = ref(1)
const total = ref(0)
const shop_name = ref("")
const t_loading = ref(true)
const tableData = ref([])
const crudStore = reactive({
  /** 加载表格数据 */
  commitQuery: () => {
    t_loading.value = true

    /** 加载数据 */
    const callback = (res: any) => {
      console.log(res)
      if (res && res.data) {
        tableData.value = res.data.rows
        total.value = res.data.count
      } else {
        ElMessage(res?.message || "请求失败！")
      }
      t_loading.value = false
    }

    /** 接口需要的参数 */
    const params = {
      num_per_page: n_size.value,
      page_id: n_page.value,
      type: "qa_question",
      shop_name: shop_name.value
    }
    /** 调用接口 */
    getTableDataApi(params).then(callback).catch(callback)
  },

  /** 标记 */
  QAMarkRecord: (status: iStatus, props: IRowMeta, row: IRow) => {
    if (status === "unreasonable" && !row.my_answer?.trim()) {
      ElMessage({
        message: "不合理选项， 请输入修改 内容！",
        type: "warning"
      })
      return false
    }
    console.log("通过")
    //
    t_loading.value = true

    /** 创建数据 */
    const callback = (res: any) => {
      console.log(res)
      if (res && res.code === 0) {
        ElMessage({
          message: "操作成功.",
          type: "success"
        })
        // reloadData
        crudStore.commitQuery()
      } else {
        ElMessage(res?.message || "操作失败！")
      }
      t_loading.value = false
    }

    /** 接口需要的参数 */
    const params: UpdateQA = {
      qa_id: props._id,
      status: status,
      answer: row.answer || "无",
      from_user_id: row.user_id,
      from_user_name: row.user_name
    }
    if (status === "unreasonable") {
      params.my_answer = row.my_answer
    }
    /** 调用接口 */
    QAMarkRecordApi(params).then(callback).catch(callback)
  }
})

crudStore.commitQuery()
const reload = () => {
  // n_size.value += 10
  crudStore.commitQuery()
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  n_size.value = val
  reload()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  n_page.value = val
  reload()
}

const formatterCreatTime = (row: IRowMeta) => {
  const cellValue = row.createdAt
  return dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss")
}
const answer_type = {
  text: "文字回答",
  video: "视频回答",
  video_P: "视频回答",
  failed: "失败",
  fail: "失败",
  ignore: "忽略",
  video_Quick: "快速回答"
}
const formatterAnswerType = (row: IRowMeta) => {
  const ctype: iType = row?.qa?.answer_type
  if (ctype) return answer_type[ctype]
  return "无"
}
</script>
<style lang="css" scoped>
.main-box {
  margin: 10px;
}
.answer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #009688;
  border-radius: 2px;
  margin: 5px 0;
  padding: 5px;
  height: 100%;
  /* min-width: 620px; */
}

.answer-text0 {
  width: 230px;
  text-align: left;
}
.answer-text {
  /* width: 120px; */
  text-align: left;
}
.answer-operation {
  min-width: 450px;
  overflow-x: auto;
}
</style>
