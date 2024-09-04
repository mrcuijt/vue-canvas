import cmder from './cmd/'

function name () {

}

function process (data) {
  var cmd = {}
  try {
    cmd = JSON.parse(data)
  } catch (e) {
    cmd = { 'error': e }
  }
  var name = cmd.cmd
  console.info(name)
  if (cmder.taskSet.has(name)) {
    return cmder[name](cmd.data)
  }
  return null
}

// 组件初始化（基础模板环境）
// 任务模块
// 建立连接
// 任务处理（消费任务）

// 1、生成页面内容区域
// 1.1、内容区域 显示/隐藏/全屏 for 组件批量生成注册，
// 2、页面内容渲染
// 3、渲染数据交互

var operator = {
  name: name,
  process: process
}

export default operator