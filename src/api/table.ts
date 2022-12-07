import { request } from "@/utils/service"

interface ICreateTableDataApi {
  username: string
  password: string
}

interface IUpdateTableDataApi {
  id: string
  username: string
  password?: string
}

interface UpdateQA {
  qa_id: string
  status: string
  answer: string // 合理 以前的、不合理 新增
  from_user_id: string // qa_mark_list 的参数
  from_user_name: string
  my_answer?: string
}

interface IGetTableDataApi {
  /** 当前页码 */
  page_id: number
  /** 查询条数 */
  num_per_page: number
  /** 查询参数 */
  username?: string
  phone?: string
}

/** 增 */
export function createTableDataApi(data: ICreateTableDataApi) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: IUpdateTableDataApi) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: IGetTableDataApi) {
  return request({
    url: "./api/v1/QAMarkRecord/report",
    method: "get",
    params
  })
}

/** 标记 */
export function QAMarkRecordApi(data: UpdateQA) {
  return request({
    url: "./api/v1/QAMarkRecord/create",
    method: "post",
    data
  })
}

/** 查 */
export function QAMarkRecordList(params: IGetTableDataApi) {
  return request({
    url: "./api/v1/QAMarkRecord/list",
    method: "get",
    params
  })
}

/** 标记 */
export function QAMarkRecordUpdate(data: UpdateQA) {
  return request({
    url: "./api/v1/QAMarkRecord/update",
    method: "post",
    data
  })
}

/** 查 */
export function QAMarkRecordReport(params: IGetTableDataApi) {
  return request({
    url: "./api/v1/QAMarkRecord/report",
    method: "get",
    params
  })
}
