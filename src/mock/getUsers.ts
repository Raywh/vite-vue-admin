// 仅做示例: 通过GET请求返回一个名字数组
export default [
  {
    url: "/api/getUsers",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        data: ["tom", "jerry"]
      }
    }
  },
  {
    url: "/api/getUsers/login",
    method: "post",
    response: () => {
      return {
        code: 0,
        message: "success",
        data: {
          token: "fefdsfdsf",
          userInfo: {
            name: "wh"
          }
        }
      }
    }
  }
]
