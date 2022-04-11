import moment from 'moment'
import { SIGN_TYPE, SIGN_TYPE_LIST, FIELD_TYPE } from '../constant/signEditor'

let userInfo = null
if (window.WEBG_STORAGE) {
  if (typeof window.WEBG_STORAGE === 'string') {
    userInfo = JSON.parse(window.WEBG_STORAGE)
  } else {
    userInfo = window.WEBG_STORAGE
  }
}
if (Cookies.get('WEBG_STORAGE')) {
  userInfo = JSON.parse(Cookies.get('WEBG_STORAGE'))
}
if (localStorage.getItem('WEBG_STORAGE')) {
  userInfo = JSON.parse(localStorage.getItem('WEBG_STORAGE'))
}

export const getTableAttr = (pl, pr, pt, pb) => {
  const _pl = pl === undefined ? 30 : pl
  const _pr = pr === undefined ? 30 : pr
  const _pt = pt === undefined ? 30 : pt
  const _pb = pb === undefined ? 30 : pb
  const a4 = {
    w: 595.41,
    h: 842.08,
  }
  const height = 750
  const width = (a4.w / a4.h) * height
  const ratio = a4.h / height
  const tableWidth = width - (_pl / ratio + _pr / ratio)
  const tableHeight = height - (_pt / ratio + _pb / ratio)
  return {
    width, height, tableWidth, tableHeight, ratio,
  }
}

export const templateTitle = (text, color, size, fontFamily, tableWidth) => {
  return {
    width: tableWidth,
    height: 50,
    left: 0,
    top: 0,
    line: 0,
    border: [],
    color: color || 'red',
    align: 'center',
    verticalAlign: 'middle',
    size: size || 22,
    fontFamily: fontFamily || 'FZXiaoBiaoSong-B05S',
    text: text || '请输入签批单标题',
    bold: false,
    isSplit: false,
    splitTable: [],
    multiType: 1, // 多人输入框展示类型
    date: 0, // 时间格式
    type: 0, //  0：文字框    1：输入框    2：时间框    3：文号框   4: 选择框   5：多人输入框   6：勾选框
  }
}

const getStep = (steps) => {
  for (let i = 0; i < steps.length; i++) {
    const { users } = steps[i]
    for (let j = 0; j < users.length; j++) {
      if (users[j].isDoing) {
        return steps[i]
      }
    }
  }
  return {
    stepId: steps[0].stepId,
    srcStepId: steps[0].srcStepId,
  }
}

export const assFieldsMethod = (table, fields, steps, signSet, allsteps, flowType) => {
  let stepId = -1
  switch (flowType) {
    case 1:
      if (steps[0].users.length === 0) { // 新建
        stepId = steps[0].stepId
      } else {
        const step = getStep(steps)
        stepId = step.stepId
      }
      break
    case 2:
      if (steps.length === 0) { // 新建
        stepId = allsteps[0].stepId
      } else {
        const step = getStep(steps)
        stepId = step.srcStepId
      }
      break
    default:
      break
  }
  if (signSet) {
    signSet = JSON.parse(signSet)
  }
  const getItemAttr = (item) => {
    const { date, id, text, type } = item
    const obj = {
      cantEditor: false,
      isAssFields: false,
      isAssFlow: false,
    }
    if (signSet && (SIGN_TYPE_LIST[type].canAssField || SIGN_TYPE_LIST[type].canAssOpinion)) { // 可编辑流程
      const setItem = signSet.find((x) => x.tableId === id)
      if (setItem && setItem.canEditorStep) {
        if (setItem.canEditorStepId !== undefined && setItem.canEditorStepId !== stepId) {
          const _steps = flowType == 2 ? allsteps : steps
          const step = _steps.find((x) => x.stepId == setItem.canEditorStepId)
          if (step) {
            obj.cantEditor = step.stepName
          }
        }
      }
    }
    if (signSet && SIGN_TYPE_LIST[type].canAssField) { // 关联字段
      const setItem = signSet.find((x) => x.tableId === id)
      if (id && setItem) {
        if (setItem.assSystem) {
          obj.isAssFields = true
          switch (setItem.assSystem) {
            case '1': // 发起人姓名
              if (!text) {
                obj.text = obj.areaText = userInfo.name
              }
              break
            case '2': // 发起人部门
              if (!text) {
                obj.text = obj.areaText = localStorage.getItem('official-signEditor-deptName')
              }
              break
            default:
              break
          }
        }
        let itemFields = null
        if (setItem.fieldId == 0) {
          itemFields = fields.find((x) => x.fieldName == setItem.fieldName)
        } else {
          itemFields = fields.find((x) => x.fieldId == setItem.fieldId)
        }
        if (itemFields) {
          const { type, options } = JSON.parse(itemFields.property)
          obj.isAssFields = true
          switch (type) {
            case FIELD_TYPE.REFNO:
              const refNo = itemFields.value ? JSON.parse(itemFields.value) : ['', '', '']
              if (!refNo[0] && !refNo[1] && !refNo[2]) {
                obj.text = obj.areaText = ''
              } else {
                obj.text = obj.areaText = `${refNo[0] || '   '}〔${refNo[1] || '  '}〕${refNo[2] || '  '}号`
              }
              break
            case FIELD_TYPE.TIME:
              const time = /-/g.test(itemFields.value) ? itemFields.value : Number(itemFields.value)
              obj.text = obj.areaText = time ? moment(Number(time)).format(date == 0 ? 'YYYY年MM月DD日' : 'MM月DD日') : ''
              break
            case FIELD_TYPE.INPUT:
              obj.text = obj.areaText = itemFields.value
              break
            case FIELD_TYPE.SELECT:
            case FIELD_TYPE.DROPDOWN:
              if (itemFields.value) {
                obj.text = obj.areaText = options.find((x) => x.value == itemFields.value).text
              }
              break
            case FIELD_TYPE.USERDEPT:
              const arr = JSON.parse(itemFields.value || '[]')
              obj.text = obj.areaText = arr.map((x) => x.name).join('、')
              break
            default:
              break
          }
        }
      }
    }
    if (signSet && SIGN_TYPE_LIST[type].canAssOpinion) { // 关联意见
      const setItem = signSet.find((x) => x.tableId === id)
      if (id && setItem) {
        const _steps = flowType == 1 ? steps : allsteps
        const stepItem = _steps.find((x) => x.stepId === setItem.stepId)
        obj.isAssFlow = stepItem ? stepItem.stepName : false
        for (let i = 0; i < steps.length; i++) {
          const { users, srcStepId, stepId } = steps[i]
          if ((flowType == 2 && srcStepId === setItem.stepId) || (flowType == 1 && stepId === setItem.stepId)) {
            const text = JSON.parse(JSON.stringify(text || []))
            for (let j = 0; j < users.length; j++) {
              const { uid, name, operTime, operType, opinion } = users[j]
              const textItem = {
                uid,
                name,
                stepId,
                time: moment(Number(operTime)).format('YYYY-MM-DD HH:mm'),
                text: opinion,
              }
              if (operType === 6 || operType === 4) { // 只关联提交的
                if (text.length == 0) {
                  text.push(textItem)
                } else {
                  const index = text.findIndex((x) => moment(x.time).isAfter(Number(operTime)))
                  if (index !== -1) {
                    text.splice(index, 0, textItem)
                  } else {
                    text.push(textItem)
                  }
                }
              }
            }
            if (text.length > 0) {
              obj.text = text
            }
          }
        }
      }
    }
    return obj
  }
  for (let i = 0; i < table.length; i++) {
    const { isSplit, splitTable } = table[i]
    if (isSplit) {
      for (let j = 0; j < splitTable.length; j++) {
        table[i].splitTable[j] = { ...splitTable[j], ...getItemAttr(splitTable[j]) }
      }
    } else {
      table[i] = { ...table[i], ...getItemAttr(table[i]) }
    }
  }
}

export const dataReverseHtml = (dataSource, fields, steps, signSet, allsteps, flowType) => {
  const pxToPt = (num) => {
    return `${num * 0.75 }pt`
  }
  const getText = (item) => {
    const { type, text, areaText, date } = item
    switch (type) {
      case SIGN_TYPE.TEXT:
      case SIGN_TYPE.SELECT:
        return text || ''
      case SIGN_TYPE.INPUT:
        return areaText || ''
      case SIGN_TYPE.TIME:
        return text || ''
      case SIGN_TYPE.REFNO:
        return text || ''
      default:
        break
    }
  }
  const getMultiTypeText = (multiType, item) => {
    switch (multiType) {
      case 1:
        return item.text
      case 2:
        return `${item.text } ${ item.name}`
      case 3:
        return `${item.text } ${ item.time}`
      case 4:
        return `${item.text } ${ item.name } ${ item.time}`
      case 5:
        return `${item.name } ${ item.time}`
      default:
        break
    }
  }
  const renderCheckNode = (item, k, item2) => {
    const opSpan = document.createElement('span')
    opSpan.style.cssText = `
        margin-bottom: ${item.checkType ? k === item.checkOptions.length - 1 ? 0 : pxToPt(6) : 0};
        margin-right: ${item.checkType ? 0 : k === item.checkOptions.length - 1 ? 0 : pxToPt(10)};
        text-align: left;
        display: ${item.checkType ? 'block' : 'inline-block'};
        position: relative;
    `
    if (item.check && item.check.indexOf(k) !== -1) {
      const opInSpan1 = document.createElement('span')
      opInSpan1.style.cssText = `
          font-size: ${pxToPt(item.size + 2)};
          width: ${pxToPt(item.size + 2)};
          height: ${pxToPt(item.size + 2)};
          line-height: ${pxToPt(item.size + 2)};
          text-align: center;
          position: absolute;
          top: ${pxToPt(0)};
          left: ${pxToPt(-1)};
      `
      opInSpan1.innerHTML = '√'
      opSpan.appendChild(opInSpan1)
    }
    const opInSpan2 = document.createElement('span')
    opInSpan2.style.cssText = `
        display: inline-block;
        vertical-align: middle;
        margin-right: ${pxToPt(5)};
        width: ${pxToPt(item.size)};
        height: ${pxToPt(item.size)};
        border: ${pxToPt(1)} solid ${item.color};
        font-size: ${pxToPt(item.size)};
        box-sizing: border-box;
    `
    opSpan.appendChild(opInSpan2)
    const opInSpan3 = document.createElement('span')
    opInSpan3.style.cssText = `
        vertical-align: middle;
        font-family: ${item.fontFamily};
        color: ${item.color};
        font-size: ${pxToPt(item.size)};
    `
    opInSpan3.innerHTML = item2
    opSpan.appendChild(opInSpan3)
    return opSpan
  }
  const data = JSON.parse(dataSource)
  const { title, titleSize, titleColor, titleFontFamily, borderColor, pt, pb, pl, pr, table } = data
  const { width, height, tableWidth, tableHeight, ratio } = getTableAttr(pl, pr, pt, pb)
  if (pt === undefined) { // 老数据
    data.pt = 30
    data.pb = 30
    data.pl = 30
    data.pr = 30
    for (let i = 0; i < table.length; i++) {
      table[i].line += 1
      table[i].top += 49
    }
    table.unshift(templateTitle(title, titleColor, titleSize, titleFontFamily, tableWidth))
    delete data.titleSize
    delete data.titleColor
    delete data.titleFontFamily
    delete data.titleTop
  }
  assFieldsMethod(table, fields, steps, signSet, allsteps, flowType)
  const $content = document.createElement('div')
  $content.setAttribute('class', 'content')
  $content.style.cssText = `
      width: ${pxToPt(width)};
      height: ${pxToPt(height)};
      position: relative;
  `
  const $table = document.createElement('div')
  $table.setAttribute('class', 'table')
  $table.style.cssText = `
      width: ${pxToPt(tableWidth)};
      height: ${pxToPt(tableHeight)};
      position: relative;
      top: ${pxToPt(pt / ratio)};
      left: ${pxToPt(pl / ratio)};
      box-sizing: border-box;
      padding: ${pxToPt(0)};
      margin: ${pxToPt(0)};
  `
  for (let i = 0; i < table.length; i++) {
    const { isSplit, splitTable, width, height, top, left,
      border, type, align, verticalAlign, size, fontFamily,
      bold, color, text, multiType, checkOptions,
    } = table[i]
    const $tableDiv = document.createElement('div')
    $tableDiv.style.cssText = `
        border-width: ${pxToPt(1)};
        border-style: solid;
        border-color: ${(() => {
      const arr = ['', '', '', '']
      for (let i = 0; i < arr.length; i++) {
        arr[i] = /\d/.test(border.find((x) => x == i)) ? borderColor : 'transparent'
      }
      return isSplit ? 'transparent' : arr.join(' ')
    })()};
        position: absolute;
        cursor: default;
        width: ${pxToPt(width)};
        height: ${pxToPt(height)};
        top: ${pxToPt(top <= 0 ? 0 : top)};
        left: ${pxToPt(left <= 0 ? 0 : left)};
        overflow: initial;
        padding: ${pxToPt(2)} ${pxToPt(6)};
        margin: ${pxToPt(0)};
        box-sizing: border-box;
    `
    if (isSplit) {
      for (let j = 0; j < splitTable.length; j++) {
        const is = splitTable[j]
        const $splitDiv = document.createElement('div')
        $splitDiv.style.cssText = `
            width: ${pxToPt(width)};
            height: ${pxToPt(is.height)};
            left: ${pxToPt(-1)};
            top: ${pxToPt(is.top)};
            border-width: ${pxToPt(1)};
            border-style: solid;
            border-color: ${(() => {
          const arr = ['', '', '', '']
          for (let k = 0; k < arr.length; k++) {
            arr[k] = /\d/.test(is.border.find((x) => x == k)) ? borderColor : 'transparent'
          }
          return arr.join(' ')
        })()};
            position: absolute;
            box-sizing: border-box;
            padding: ${pxToPt(2)} ${pxToPt(6)};
            margin: ${pxToPt(0)};
        `
        const $splitInDiv = document.createElement('div')
        $splitInDiv.style.cssText = `
            width: ${pxToPt(width - 8)};
            height: ${pxToPt(is.height - 6)};
            display: table-cell;
            box-sizing: border-box;
            word-break: break-all;
            padding: ${pxToPt(0)};
            margin: ${pxToPt(0)};
            text-align: ${is.align};
            vertical-align: ${is.verticalAlign};
        `
        const $splitInDivInSpan = document.createElement('span')
        $splitInDivInSpan.style.cssText = `
            font-family: ${is.fontFamily};
            color: ${is.color};
            white-space: ${(is.type == SIGN_TYPE.MULTI || is.type == SIGN_TYPE.CHECKBOX) ? 'normal' : 'pre-wrap'};
            line-height: 1.15;
            padding: ${pxToPt(0)};
            margin: ${pxToPt(0)};
            box-sizing: border-box;
            font-weight: ${is.bold ? 700 : 400};
            font-size: ${pxToPt(is.size)};
            display: ${is.type == SIGN_TYPE.CHECKBOX ? 'inline-table' : ''};
        `
        if (is.type == SIGN_TYPE.MULTI) {
          if (is.text && is.text.length > 0) {
            for (let k = 0; k < is.text.length; k++) {
              const opSpan = document.createElement('span')
              opSpan.style.display = 'block'
              const opopSpan = document.createElement('span')
              opopSpan.style.whiteSpace = 'pre-wrap'
              opopSpan.innerHTML = getMultiTypeText(is.multiType, is.text[k])
              opSpan.appendChild(opopSpan)
              $splitInDivInSpan.appendChild(opSpan)
            }
          }
        } else if (is.type == SIGN_TYPE.CHECKBOX) {
          for (let k = 0; k < is.checkOptions.length; k++) {
            $splitInDivInSpan.appendChild(renderCheckNode(is, k, is.checkOptions[k]))
          }
        } else {
          $splitInDivInSpan.innerHTML = getText(is)
        }
        $splitInDiv.appendChild($splitInDivInSpan)
        $splitDiv.appendChild($splitInDiv)
        $tableDiv.appendChild($splitDiv)
      }
    } else {
      const $noSplitDiv = document.createElement('div')
      $noSplitDiv.style.cssText = `
          width: ${pxToPt(width - 12)};
          height: ${pxToPt(height - 6)};
          display: table-cell;
          box-sizing: border-box;
          word-break: break-all;
          padding: ${pxToPt(0)};
          margin: ${pxToPt(0)};
          text-align: ${align};
          vertical-align: ${verticalAlign};
      `
      const $noSplitDivInSpan = document.createElement('span')
      $noSplitDivInSpan.style.cssText = `
          font-family: ${fontFamily};
          color: ${color};
          white-space: pre-wrap;
          line-height: 1.15;
          padding: ${pxToPt(0)};
          margin: ${pxToPt(0)};
          box-sizing: border-box;
          font-weight: ${bold ? 700 : 400};
          font-size: ${pxToPt(size)};
          display: ${type == SIGN_TYPE.CHECKBOX ? 'inline-table' : ''};
      `
      if (type == SIGN_TYPE.MULTI) {
        if (text && text.length > 0) {
          for (let k = 0; k < text.length; k++) {
            const opSpan = document.createElement('span')
            opSpan.style.display = 'block'
            opSpan.innerHTML = getMultiTypeText(multiType, text[k])
            $noSplitDivInSpan.appendChild(opSpan)
          }
        }
      } else if (type == SIGN_TYPE.CHECKBOX) {
        for (let k = 0; k < checkOptions.length; k++) {
          $noSplitDivInSpan.appendChild(renderCheckNode(table[i], k, checkOptions[k]))
        }
      } else {
        $noSplitDivInSpan.innerHTML = getText(table[i])
      }
      $noSplitDiv.appendChild($noSplitDivInSpan)
      $tableDiv.appendChild($noSplitDiv)
    }
    $table.appendChild($tableDiv)
  }
  const $bottom = document.createElement('div')
  $bottom.style.cssText = `
    width: 100%;
    height: ${pxToPt(pb / ratio)};
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 9999;
  `
  $content.appendChild($table)
  $content.appendChild($bottom)
  const pdfWidth = '21cm'
  const pdfHeight = '29.7cm'
  const $html = document.createElement('html')
  const $head = '<style media="print" type="text/css">@page { size: A4; margin: 0; padding: 0; }</style></head>'
  $html.innerHTML = $head
  const $body = $html.getElementsByTagName('body')[0]
  $body.style.padding = '0pt'
  $body.style.margin = '0pt'
  $body.style.width = pdfWidth
  $body.style.height = pdfHeight
  $body.style.border = 'none'
  $body.style.overflow = 'hidden'
  let $contentHTML = $content.innerHTML
  $contentHTML = $contentHTML.replace(/\b(\d+\.?\d*)pt/g, (re, $1) => {
    return `${(Number($1) * ratio / 0.75).toFixed(2)}pt`
  })
  $body.innerHTML = $contentHTML
  $html.appendChild($body)
  return {
    data: JSON.stringify(data),
    html: $html.innerHTML,
  }
}
