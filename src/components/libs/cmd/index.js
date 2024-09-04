
import AUTH_HEART from './auth_heart.js'

import TASK_INIT from './task_init.js'
import TASK_DATA_FIX from './task_data_fix.js'

import DANMUK_MSG from './danmuk_msg.js'
import AUTH_SUCCESS from './danmuk_msg.js'
import DANMUK_MSG_RESET_PROGRESS from './danmuk_msg_reset_progress.js'

var taskSet = new Set()
taskSet.add('AUTH')
taskSet.add('AUTH_SUCCESS')
taskSet.add('AUTH_FAIL')
taskSet.add('FAIL')
taskSet.add('AUTH_HEART')

taskSet.add('TASK_INIT')
taskSet.add('TASK_DATA_FIX')
taskSet.add('TASK_INCREMENT')
taskSet.add('TASK_INCREMENT_ACTUAL')
taskSet.add('TASK_INCREMENT_EXPECTED')

taskSet.add('DANMUK_MSG')
taskSet.add('DANMUK_NOTIFY')
taskSet.add('DANMUK_MSG_RESET_PROGRESS')

var cmder = {
  taskSet: taskSet,
  TASK_INIT: TASK_INIT,
  TASK_DATA_FIX: TASK_DATA_FIX,
  DANMUK_MSG: DANMUK_MSG,
  AUTH_SUCCESS: AUTH_SUCCESS,
  DANMUK_MSG_RESET_PROGRESS: DANMUK_MSG_RESET_PROGRESS,
  AUTH_HEART: AUTH_HEART
}

export default cmder