
import operator from './operator.js'

class WebSocketer {

  constructor(messageCall) {
    this.socket = {}
    this.messageCall = messageCall
    this.name = 'WebSocket'
    this.roomId = ''
    this.roomName = ''
  }
  connect (roomId, roomName) {
    this.roomId = roomId
    this.roomName = roomName
    // 建立 WebSocket 连接
    this.socket = new WebSocket('ws://127.0.0.1:8600/tools/websocket/command')
    this.socket.onopen = () => {
      this.onOpen(), this.heart()
    }
    this.socket.onclose = () => { this.onClose() }
    window.danmukws.push(this)
  }
  // 心跳保持
  heart () {
    var _this = this
    setInterval(() => {
      var obj = {
        cmd: 'AUTH_HEART',
        data: {
          roomId: _this.roomId,
          roomName: _this.roomName
        }
      }
      _this.send(JSON.stringify(obj))
    }, 3 * 1000)
  }
  send (message) {
    this.socket.send(message)
  }
  // 接收消息
  onMessage (event) {
    // console.info(event.data)
    // console.info(this)
    var result = operator.process(event.data)
    this.messageCall(result)
  }
  // 会话建立
  onOpen () {
    this.socket.onmessage = (event) => {
      this.onMessage(event)
    }
    var obj = {
      cmd: 'AUTH',
      data: {
        userId: 'demo',
        reqTime: '2024-07-19 17:19:20'
      }
    }
    this.send(JSON.stringify(obj))
    // obj.cmd = 'TASK_INIT'
    // operator.process(JSON.stringify(obj))
  }
  // 会话关闭
  onClose () {
  }

}

export default WebSocketer