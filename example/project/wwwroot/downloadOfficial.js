/* eslint-disable eqeqeq */
import moment from 'moment'
import _ from 'lodash'
import { getSerialNumStrFromStr, safeJsonParse, HTMLEncode } from './index.js'
import generateHtml from './generateHtml'
import { FIELD_TYPE, PDFGENERATOR_URL } from '../constant'

// data是{name:xx,value:xx}的数组
const formSubmit = (url, data = []) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  // eslint-disable-next-line no-restricted-syntax
  for (const field of data) {
    const el = document.createElement('textarea')
    el.style = 'display:none'
    el.name = field.name
    el.value = field.value
    form.appendChild(el)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

const getFieldNameValue = (field) => {
  const { fieldName, value, property, aliasName, customName } = field
  const propertyObj = property ? JSON.parse(property) : {}
  const { type } = propertyObj
  let strValue = value

  switch (type) {
    case 'sign':
      if ([FIELD_TYPE.BODY_FILE, FIELD_TYPE.ENCLOSURE].includes(fieldName)) {
        if (value) {
          strValue = JSON.parse(value)
            .map((file) => {
              let fileName = file.name
              if (fieldName == FIELD_TYPE.BODY_FILE) {
                fileName = fileName.split('.').slice(0, -1).concat('pdf').join('.')
              }
              let { url } = file
              if (!/\/fcscloud/.test(url)) {
                url = `${file.url}&amp;filename=${encodeURIComponent(fileName)}`
              }
              return `<a href="${url}">${HTMLEncode(fileName)}</a>`
            })
            .join('<br/>')
        }
      } else if (fieldName == FIELD_TYPE.SIGN_FILE) {
        if (value) {
          strValue = JSON.parse(value)
            .map((file) => {
              const isOnlineEdit = file.value
              const fileName = isOnlineEdit ? `${JSON.parse(file.value).title}.pdf` : file.name
              let { url } = file
              if (!/\/fcscloud/.test(url)) {
                url = `${file.url}&amp;filename=${encodeURIComponent(fileName)}`
              }
              return `<a href="${url}">${HTMLEncode(fileName)}</a>`
            })
            .join('<br/>')
        }
      }
      break
    case 'refno':
    case 'refNo':
    case 'receiptRefNo':
      strValue = getSerialNumStrFromStr(value)
      break
    case 'time':
      if (value) {
        strValue = moment(+value || value).format(propertyObj.format)
      }
      break
    case 'dropDown':
    case 'select':
      if (value) {
        const option = propertyObj.options.find((op) => op.value == value)
        strValue = option.text
      }
      break
    case 'userOrdept':
      if (value) {
        const parseVal = safeJsonParse(value, [])
        strValue = parseVal.map((it) => it.name).join('、')
      }
      break
    case 'input':
      if (value) {
        strValue = HTMLEncode(value)
      }

      break
    case 'text': {
      if (fieldName === FIELD_TYPE.FILE_DEPARTMENT) {
        const dept = safeJsonParse(value)
        if (typeof dept !== 'object') {
          strValue = value
        } else {
          strValue = dept.name
        }
      } else if (fieldName === FIELD_TYPE.CREAT_TIME) {
        if (value) {
          strValue = moment(+value || value).format('YYYY-MM-DD')
        }
      } else {
        strValue = value
      }
      break
    }
    default:
      strValue = value
      break
  }

  return {
    name: customName || aliasName,
    value: strValue,
  }
}
export const downloadOfficial = ({ fields, steps }) => {
  const fieldsData = fields.map((field) => getFieldNameValue(field))
  const html = generateHtml(fieldsData, steps)
  const title = _.get(
    fields.find((field) => field.fieldName == FIELD_TYPE.TITLE),
    'value',
    '公文单',
  )
  formSubmit(PDFGENERATOR_URL, [
    {
      name: 'fileName',
      value: title,
    },
    {
      name: 'htmlCode',
      value: html,
    },
  ])
}
