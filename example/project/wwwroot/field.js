import { FIELD_TYPE } from 'ROOT/constant'
import { safeJsonParse, getSerialNumStrFromStr } from 'ROOT/wpsutils'

/**
 * 从 field 中获取值
 *
 * @param {object} field
 * @returns {string|object}
 */
function getValueByField(field) {
  const {
    fieldName,
    property,
    value,
  } = field || {}

  switch (fieldName) {
    default:
    case FIELD_TYPE.TITLE: {
      return value || ''
    }

    case FIELD_TYPE.WRITING:
    case FIELD_TYPE.USESEAL:
    case FIELD_TYPE.SECRET_CLASS:
    case FIELD_TYPE.URGENCY_LEVEL: {
      const parseProperty = safeJsonParse(property, {})
      const { options = [] } = parseProperty
      if (options.length === 0) {
        return ''
      }
      const curOption = options.find((it) => it.value === Number(value))
      if (!curOption) {
        return ''
      }
      return curOption.text
    }

    case FIELD_TYPE.REF_NO:
    case FIELD_TYPE.OUTSIDE_REF_NO:
    case FIELD_TYPE.RECEIPT_REF_NO: {
      return getSerialNumStrFromStr(value, '')
    }

    case FIELD_TYPE.MAIN_SEND:
    case FIELD_TYPE.COPY_SEND: {
      const parseValue = safeJsonParse(value, [])
      if (parseValue.length === 0) {
        return ''
      }

      return parseValue.map((item) => item.name).join('、')
    }

    case FIELD_TYPE.BODY_FILE:
    case FIELD_TYPE.ENCLOSURE: {
      const parseValue = safeJsonParse(value, [])
      return parseValue
    }
  }
}

/**
 * 根据字段获取格式化字段
 *
 * @export
 * @param {object[]} [fields=[]] 字段源数组
 * @returns {object} 字段
 */
export function parseField2Obj(fields = []) {
  const fieldObj = {}
  if (fields.length === 0) {
    return {}
  }

  fields.forEach((fieldItem) => {
    const { fieldName } = fieldItem || {}

    const value = getValueByField(fieldItem)

    if (!value) {
      return
    }

    fieldObj[fieldName] = value
  })

  return fieldObj
}
