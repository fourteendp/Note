async function get_weather(
  city = "shenzhen",
  format = "> 位置： %l\\n> 天气：%c %C 气温：%t 风力：%w\\n> 月相：%m 日出时间：%S 日落时间：%s",
) {
  let url = "https://www.msn.cn/zh-cn/weather/"
  let res = await request({ url, method: "GET" })
  console.log(res)
}

module.exports = get_weather
