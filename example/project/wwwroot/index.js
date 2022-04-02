import _ from 'lodash'
import { globalStore } from '@xm/util'
import official from 'ROOT/service/official'
import store from 'ROOT/store'

import generateHtml from './generateHtml'
import { FIELD_TYPE, ALL_OPERATIONS, PDFGENERATOR_URL, FLOW_TYPE } from '../constant'

export {
  syncSignFile,
  downloadFile,
  downloadSignFile,
  downloadSignFileWithMarks,
  getBodyFilePdfUrl,
  getPreviewOriginUrl,
  generateBodyFilePdfAndMarksPdfUrl,
  downloadBodyFilePdf,
  downloadBodyFileWithMarks,
  downloadBodyFileOriginal,
  getIsFirstEnterFileTab,
  getBodyFileOperations,
  getBodyFileTaoHongTpl,
  doc2pdf,
  getStampInfo,
  getSubmitBodyFile,
  getMergedBodyFile,
  composePdfMarks,
  taohong,
  downloadBodyFileWithWaterMarks,
} from './file-operator'

export { wpsEdit, outWpsEdit, getFileInfoFromSaveMsg } from './wps'

export { downloadOfficial } from './downloadOfficial'

export { generateHtml }

export const HTMLEncode = (html) => {
  // 1.首先动态创建一个容器标签元素，如DIV
  let temp = document.createElement('div')
  // 2.然后将要转换的字符串设置为这个元素的innerText或者textContent
  temp.textContent != undefined ? (temp.textContent = html) : (temp.innerText = html)
  // 3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
  const output = temp.innerHTML
  temp = null
  return output
}

// const getOrgId = () => store.getState().orgData.currentOrgId
const getOrgId = () => globalStore.get('orgId')
const mobile = globalStore.get('mobile')
const name = globalStore.get('name')


const getUid = () => store.getState().loginUserData.uid

// 根据文号数组返回文号字符串
export const getSerialNumStr = (serialArr, defaultValue = '-') =>
(serialArr[0] || serialArr[1] || serialArr[2]
  ? `${serialArr[0] || ''}〔${serialArr[1] || ''}〕${serialArr[2] || ''}号`
  : defaultValue)

export const getSerialNumStrFromStr = (serialStr, defaultValue = '-') => {
  if (!serialStr) {
    return defaultValue
  }

  if (!/^\[[\S\s]*]$/g.test(serialStr)) {
    return serialStr || defaultValue
  }

  let refNo = ['', '', '']
  try {
    refNo = JSON.parse(serialStr)
  } catch (e) {
    console.error(`JSON.parse refNo ERROR ${serialStr}`)
    return defaultValue
  }
  return getSerialNumStr(refNo, defaultValue)
}

export const isSerialNumComplete = (serialNum) => {
  if (!serialNum) return false
  try {
    const value = JSON.parse(serialNum)
    if (!value[0] || !value[1] || !value[2]) {
      return false
    }
  } catch (error) {
    console.log('parse serial num error', error)
    return false
  }
  return true
}

export const getQuery = (str, name) => {
  if (!str) return undefined
  const regex = new RegExp(`[?&](${name}=([^&]+))`)
  const result = regex.exec(str)

  if (result) return result[2]
  return undefined
}

export const queryString = (params) => {
  if (typeof params !== 'object' || params === null) {
    return ''
  }
  const pairs = []
  for (const key in params) {
    pairs.push(`${key}=${params[key]}`)
  }
  return pairs.length > 0 ? `?${pairs.join('&')}` : ''
}

/**
 * 公文督办，根据毫秒数返回对应的时间展示
 * @param {*} milsecs
 */
export const getDurationTimeStr = (milsecs) => {
  const oneMinute = 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneDay = oneHour * 24
  const getMinuteStr = (secs) => {
    return `${parseInt(secs / oneMinute)}分钟`
  }
  const getHourStr = (secs) => {
    return `${parseInt(secs / oneHour)}小时`
  }
  const getDayStr = (secs) => {
    return `${parseInt(secs / oneDay)}天`
  }
  if (milsecs < 0) {
    return '-'
  }
  if (milsecs < oneMinute) {
    return '1分钟'
  }
  if (milsecs < oneHour) {
    return `${getMinuteStr(milsecs)}`
  }
  if (milsecs <= oneDay) {
    return `${getHourStr(milsecs)}${getMinuteStr(milsecs % oneHour)}`
  }
  return `${getDayStr(milsecs)}${getHourStr(milsecs % oneDay)}${getMinuteStr(milsecs % oneHour)}`
}

export const isSignFileLinkedOpinon = (fields, signSets = {}) => {
  // 没有签批单字段
  const signFieldIndex = fields.findIndex((field) => field.fieldName == FIELD_TYPE.SIGN_FILE)
  if (signFieldIndex < 0) return false

  // 签批单字段没有值
  let signField = fields[signFieldIndex].value
  if (!signField) return false

  signField = JSON.parse(signField)

  // 如果签批单是上传的
  if (signField.every((it) => !it.value)) return fields[signFieldIndex]

  // 如果字段内容没有修改，并且没有意见关联
  const signSet = signSets[signField[0].id]
  return !!signSet
}

export const isFieldReadonly = (allOperations, field, steps, curStep, flowType) => {
  switch (field.fieldName) {
    case FIELD_TYPE.SIGN_FILE:
    case FIELD_TYPE.BODY_FILE:
      return (
        !allOperations.includes(ALL_OPERATIONS.CAN_EDIT_FIELD) ||
        !allOperations.includes(ALL_OPERATIONS.UPLOAD_DELETE)
      )
    default:
      return !(
        allOperations.includes(ALL_OPERATIONS.CAN_EDIT_FIELD) &&
        (!field.fillSteps.length ||
          field.fillSteps.includes(
            _.get(steps[curStep], flowType == FLOW_TYPE.FREE ? 'srcStepId' : 'stepId', ''),
          ))
      )
  }
}

export const getRefNoFieldReadonly = (allOperations) => {
  return !allOperations.includes(ALL_OPERATIONS.CAN_EDIT_FIELD)
}

export const getRefNoFieldCanEdit = (field, steps, curStep, flowType) => {
  const curStepId = _.get(steps[curStep], flowType == FLOW_TYPE.FREE ? 'srcStepId' : 'stepId', '')
  const {
    setPronounFlow,
    setSerialFlow,
  } = safeJsonParse(field.property, {})

  const getIsDisable = (setFlow) => {
    if (!setFlow || setFlow.type !== 2) {
      return false
    }

    const setFlowValue = setFlow.value || []

    if (setFlowValue.length === 0) {
      return false
    }

    return !setFlowValue.includes(curStepId)
  }

  return {
    pronounDisable: getIsDisable(setPronounFlow),
    serialDisable: getIsDisable(setSerialFlow),
  }
}

export const getSubmitFields = (originalFieldsValue, newFields, remoteFields) => {
  const result = []
  for (let index = 0, len = newFields.length; index < len; index++) {
    const originalValue = originalFieldsValue[index]
    const remoteField = remoteFields[index]
    const localField = newFields[index]
    const isValueChangedDif =
      originalValue != localField.value &&
      originalValue != remoteField.value &&
      localField.value != remoteField.value

    if (localField.fieldName == FIELD_TYPE.BODY_FILE) {
      // 提交时不提交正文，所以不校验
      result.push({
        ...localField,
        notChanged: true,
      })
    } else if (localField.fieldName == FIELD_TYPE.SIGN_FILE) {
      if (isValueChangedDif) {
        result.push({
          ...remoteField,
          isConflict: true,
        })
        continue
      }
      if (!localField.value) {
        result.push({
          ...localField,
          notChanged: true,
        })
        continue
      }
      const originalSignFile = JSON.parse(originalValue)[0]
      const localSignFile = JSON.parse(localField.value)[0]
      const remoteSignFile = JSON.parse(remoteField.value)[0]
      const isEditCompatiable =
        (originalSignFile && originalSignFile.value) == (localSignFile && localSignFile.value) ||
        (originalSignFile && originalSignFile.value) == (remoteSignFile && remoteSignFile.value) ||
        (localSignFile && localSignFile.value) == (remoteSignFile && remoteSignFile.value)

      if (!isEditCompatiable) {
        result.push({
          ...remoteField,
          isConflict: true,
        })
        continue
      }
      if ((originalSignFile && originalSignFile.value) == (localSignFile && localSignFile.value)) {
        result.push({
          ...remoteField,
        })
      } else {
        result.push({
          ...localField,
          marks: remoteField.marks,
        })
      }
    } else {
      if (isValueChangedDif) {
        result.push({
          ...remoteField,
          isConflict: true,
        })
        continue
      }
      if (originalValue == localField.value) {
        result.push({
          ...localField,
          notChanged: true,
        })
      } else {
        result.push({ ...localField })
      }
    }
  }

  return result
}

// 根据目录id找到归档目录中的目录

export const getDirByDirId = (dirs, dirId) => {
  const walk = (dirs, dirId) => {
    for (const dir of dirs) {
      if (dir.id === dirId) {
        return dir
      }
      if (dir.children) {
        const result = walk(dir.children, dirId)
        if (result) return result
      }
    }
  }
  return walk(dirs, dirId)
}

export const getDisplayArchiveNo = (archiveNoStr) => {
  if (!archiveNoStr) return ''
  const obj = JSON.parse(archiveNoStr)
  const {
    totalNo = '',
    typeCode = '',
    year = '',
    retentionPeriod = '',
    orgCode = '',
    num = '',
  } = obj
  return `${totalNo}-${typeCode}·${year}-${retentionPeriod}-${orgCode}-${String(num).padStart(
    4,
    '0',
  )}`
}

export const safeJsonParse = (str, defaultValue) => {
  let result = defaultValue
  if (!str) return result
  try {
    result = JSON.parse(str)
  } catch (error) {
    console.error(error)
  }
  return result
}

/**
 * 获取水印base64
 */
export const getWaterMask = (config) => {
  const defaultConfig = {
    text: '水印',
    fontSize: 20,
    rotate: -30,
    color: 'rgba(203, 207, 214, .5)',
  }
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  }
  const { text, fontSize, rotate, color } = mergedConfig

  const $canvas = document.createElement('canvas')
  const ctx = $canvas.getContext('2d')

  ctx.font = `normal normal 100 ${fontSize}px MicrosoftYahei`

  const { width } = ctx.measureText(text)
  // const height = fontSize
  const rotateAngle = (rotate * Math.PI) / 180
  let drawWidth = Math.abs(width * Math.cos(rotateAngle)) + fontSize
  let drawHeight = Math.abs(width * Math.sin(rotateAngle)) + 2 * fontSize

  drawWidth *= 1.2
  drawHeight *= 1.2

  $canvas.width = drawWidth
  $canvas.height = drawHeight
  ctx.fillStyle = color

  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = `normal normal 100 ${fontSize}px MicrosoftYahei`
  ctx.translate(drawWidth / 2, drawHeight / 2)
  ctx.rotate(rotateAngle)
  ctx.fillText(text, 0, 0)

  return $canvas.toDataURL()
}

let waterMarkPromise = null
export const reGetWaterMarkConfig = () => {
  waterMarkPromise = official.getDocumentWatermark()
}
export const getWaterMarkConfig = () => {
  if (!waterMarkPromise) {
    reGetWaterMarkConfig()
  }

  return waterMarkPromise.then((data) => {
    const { openWatermark, type, customize } = data.watermark
    let text = ''
    if (openWatermark) {
      if (type === 1) {
        text = name + String(mobile).slice(-4)
      } else {
        text = customize
      }
    }
    return {
      isOpen: openWatermark,
      text,
    }
  })
}

export const getBase64FromImgUrl = (url, type = 'png') => {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0)
      resolve(canvas.toDataURL(`image/${type}`, 1))
    }
    image.src = url
  })
}

/**
 * 文件是否可见
 *
 * @export
 * @param {object[]} [deptList=[]] 我的部门列表
 * @param {object[]} [depts=[]] 可见范围部门列表
 * @returns {boolean} 是否可见
 */
export function getIsShowFile(deptList = [], depts = []) {
  // 我不属于任何 1 个部门，总是可见
  if (deptList.length === 0) {
    return true
  }

  // 不限制部门可见
  if (depts.length === 0) {
    return true
  }

  // 正常可见
  const deptIds = depts.map((item) => item.id)
  return deptList.some((item) => deptIds.includes(item.id))
}

/**
 * 补充数字前置
 *
 * @export
 * @param {number} num
 * @param {number} [length=2]
 * @returns {string}
 */
export function completeNumByLen(num, length = 2) {
  return `${num}`.length < length
    ? (new Array(length + 1).join('0') + num).slice(-length)
    : `${num}`
}

/**
 * 阻止默认事件
 *
 * @export
 * @param {Event} e
 */
export function stopPropagation(e) {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
}

/**
 *  获取 对应字段
 *
 * @export
 * @param {object[]} [fields=[]]
 * @param {string} [fieldName='']
 * @returns
 */
export function getField(fields = [], fieldName = '') {
  let currentField = null
  let currentFieldIndex = -1
  if (fields.length === 0 || !fieldName) {
    return [currentField, currentFieldIndex]
  }

  currentFieldIndex = fields.findIndex((item) => {
    return item.fieldName === fieldName
  })

  if (currentFieldIndex !== -1) {
    currentField = fields[currentFieldIndex]
  }

  return [currentField, currentFieldIndex]
}

/**
 * 检查操作系统
 *
 * @returns Win10 | Win7 | WinVista | Win2003 | WinXP | Win2000 | Linux | Unix | Mac
 */
export function detectOS() {
  // const sUserAgent = navigator.userAgent;

  const isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows'
  const isMac =
    navigator.platform == 'Mac68K' ||
    navigator.platform == 'MacPPC' ||
    navigator.platform == 'Macintosh' ||
    navigator.platform == 'MacIntel'
  if (isMac) return 'Mac'
  const isUnix = navigator.platform == 'X11' && !isWin && !isMac
  if (isUnix) return 'Unix'
  const isLinux = String(navigator.platform).indexOf('Linux') > -1
  if (isLinux) return 'Linux'
  if (isWin) {
    return 'Windows'
  }
  return 'other'
}

// 是否是 window
export const isWindow = /^(win|linux)/i.test(detectOS())

/**
 * 获取滚动宽度
 *
 * @export
 * @param {*} [columns=[]]
 * @returns
 */
export function getScrollWidth(columns = []) {
  if (columns.length === 0) {
    return false
  }

  let totalWidth = 0
  columns.forEach((item) => {
    totalWidth += item.width
  })

  return totalWidth
}


export const replaceHtmlString = (text) => {
  if (text) {
    return text.replace(/<\/?[A-Za-z]+(\s+[A-Za-z]+=".*")*>/g, '')
  }

  return text
}
