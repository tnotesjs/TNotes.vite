// mock/user.ts
export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          name: '张三',
          age: 25,
        },
      }
    },
  },
]
