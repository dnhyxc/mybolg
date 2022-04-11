// 正文和签批单操作的工具函数

import { message } from 'antd'
import { globalStore } from '@xm/util'
// import Confirm from 'ROOT/components/ConfirmModal'

import official from 'ROOT/service/official'
// import { official } from 'ROOT/service'
import store from 'ROOT/store'
import { dataReverseHtml } from './signEditor'
import {
  FIELD_TYPE,
  UPLOAD_LIMIT_DOC_TYPE,
  UPLOAD_LIMIT_PDF_TYPE,
  ALL_OPERATIONS,
  BODY_FILE_OPERATION,
  STEP_TYPE,
  OPER_TYPE_NAME,
  OPEN_ONLINE_EDIT,
  UPLOAD_FILE_TYPE,
} from '../constant'

const getUid = () => store.getState().loginUserData.uid

export const syncSignFile = (
  steps,
  fields,
  fieldsValue = [],
  signSets = {},
  isSubmit,
  allsteps,
  flowType,
) => {
  // 没有签批单字段
  const signFieldIndex = fields.findIndex(field => field.fieldName == FIELD_TYPE.SIGN_FILE)
  if (signFieldIndex < 0) return fields[signFieldIndex]

  // 签批单字段没有值
  let signField = fields[signFieldIndex].value
  if (!signField) return fields[signFieldIndex]

  signField = JSON.parse(signField)

  if (!signField.length) return fields[signFieldIndex]

  // 如果签批单是上传的
  if (signField.every(it => !it.value)) return fields[signFieldIndex]

  // 有含法律效应的签批，签批单不同步意见和字段
  if (signField[0].isAuth) return fields[signFieldIndex]

  // 如果字段内容没有修改，并且没有意见关联
  const isFieldsChanged = fieldsValue.some(
    (it, index) => it != fields[index].value && index != signFieldIndex,
  )
  const signSet = signSets[signField[0].id] || ''
  if (!isFieldsChanged && (!signSet || !isSubmit)) {
    return fields[signFieldIndex]
  }

  const { data, html } = dataReverseHtml(
    signField[0].value,
    fields,
    steps,
    signSet,
    allsteps,
    flowType,
  )
  return official.generatePdf(html).then(({ data: fileurl }) => {
    return Promise.resolve()
      .then(() => {
        // 如果有marks，生成新的downloadUrl，否则下载时签批单不包含签批内容
        const { marks } = signField[0]
        if (!marks || !marks.length) return fileurl

        return composePdfMarks(fileurl, marks)
      })
      .then(url => {
        const newSignField = [
          {
            ...signField[0],
            value: data,
            url,
            downloadUrl: url,
            originalUrl: fileurl,
            noMarksPdfUrl: fileurl,
          },
        ]
        fields[signFieldIndex].value = JSON.stringify(newSignField)
        return fields[signFieldIndex]
      })
  })
}

export const composePdfMarks = (pdfUrl, marks) => {
  if (!marks || !marks.length) return Promise.resolve(pdfUrl)
  // 我们自己的a4标准
  const a4 = {
    w: 595,
    h: 841.92,
  }
  const images = []
  // eslint-disable-next-line no-restricted-syntax
  for (const mark of marks) {
    const { pageNo, url, x, y, w, h } = mark
    images.push({
      pageNo,
      imageUrl: url,
      x: a4.w * x,
      y: a4.h - a4.h * y - a4.h * h,
      width: a4.w * w,
      height: a4.h * h,
    })
  }

  return official
    .composePdf2({
      orgId: getOrgId(),
      pdfUrl,
      images,
    })
    .then(res => res.data)
}

/**
 * 下载文件
 *
 * @export
 * @param {string} [url=''] 文件URL
 * @param {string} [fileName=''] 文件名
 * @param {boolean} [isDirectly=false] 是否直接下载
 */
export function downloadFile(url = '', fileName = '', isDirectly = false) {
  const el = document.createElement('iframe')
  el.style = 'position:fixed;height:0;width:0;'

  if (/\/fcscloud/.test(url) || isDirectly) {
    el.src = url
  } else {
    el.src = `${url}&filename=${encodeURIComponent(fileName)}`
  }
  document.body.appendChild(el)

  setTimeout(() => {
    document.body.removeChild(el)
  }, 2000)
}

export const downloadSignFile = signFileField => {
  let fileName = signFileField.name || `${JSON.parse(signFileField.value).title}.pdf`
  const url = signFileField.originalUrl
  if (fileName.indexOf('.pdf') < 0) {
    fileName += '.pdf'
  }
  downloadFile(url, fileName)
}

export const downloadSignFileWithMarks = signFileField => {
  let fileName = signFileField.name || `${JSON.parse(signFileField.value).title}.pdf`
  const url = signFileField.url || signFileField.downloadUrl
  if (fileName.indexOf('.pdf') < 0) {
    fileName += '.pdf'
  }
  downloadFile(url, fileName)
}

export const doc2pdf = (fileName, url) => {
  return official
    .doc2pdf({
      // orgId: getOrgId(),
      fileName,
      srcUrl: url,
    })
    .then(res => {
      const url = res.descUrl
      return url
    })
}

export const addWaterMark = (url, type = 'pdf') => {
  return official
    .addWatermark({
      url,
      type,
    })
    .then(res => {
      const url = res.descUrl
      return url
    })
}

export const getBodyFileTaoHongTpl = type => {
  return official.getDocumentBodyFileList({ orgId: getOrgId(), type }).then(({ data }) => {
    const { bodyFiles } = data
    const list = bodyFiles
      .map(obj => {
        return {
          id: obj.id,
          value: JSON.parse(obj.fileInfo),
          type: obj.type,
        }
      })
      .filter(it => it.type == type)
    if (!list.length) {
      const msg =
        type === UPLOAD_FILE_TYPE.BODY_FILE
          ? '请在管理后台-公文专业版-公文模板管理中上传正文模板'
          : '请在管理后台-公文专业版-公文模板管理中上传红头模板'
      message.error(msg)
      throw new Error(msg)
    }
    return list
  })
}

export const generateBodyFilePdfAndMarksPdfUrl = file => {
  return new Promise((resolve, reject) => {
    if (UPLOAD_LIMIT_DOC_TYPE.includes(file.type)) {
      doc2pdf(file.name, file.originalUrl)
        .then(pdfUrl => {
          return composePdfMarks(pdfUrl, file.marks).then(marksUrl => {
            resolve({
              noMarksPdfUrl: pdfUrl,
              marksPdfUrl: marksUrl,
            })
          })
        })
        .catch(reject)
    } else {
      // 非word文件的marks无法在pc端改变，所以直接返回url
      resolve({
        noMarksPdfUrl: file.noMarksPdfUrl,
        marksPdfUrl: file.url,
      })
    }
  })
}

export const downloadBodyFileOriginal = file => {
  const fileName = file.name
  downloadFile(file.originalUrl, fileName)
}

export const downloadBodyFilePdf = file => {
  getBodyFilePdfUrl(file).then(url => {
    const fileName = `${file.name.slice(0, file.name.lastIndexOf('.'))}.pdf`
    downloadFile(url, fileName)
  })
}

export const getBodyFilePdfUrl = file => {
  return new Promise(resolve => {
    if (UPLOAD_LIMIT_DOC_TYPE.includes(file.type)) {
      //  noMarksPdfUrl是后加的，可能不存在
      if (file.noMarksPdfUrl) {
        resolve(file.noMarksPdfUrl)
      } else if (!file.originalUrl) {
        resolve('')
      } else {
        doc2pdf(file.name, file.originalUrl).then(resolve)
      }
    } else {
      resolve(file.originalUrl)
    }
  })
}

export const getPreviewOriginUrl = file => {
  return new Promise(resolve => {
    if (UPLOAD_LIMIT_DOC_TYPE.includes(file.type)) {
      //  noMarksPdfUrl是后加的，可能不存在
      if (!file.originalUrl) {
        resolve('')
      } else {
        doc2pdf(file.name, file.originalUrl).then(resolve)
      }
    } else {
      resolve(file.originalUrl)
    }
  })
}

export const downloadBodyFileWithMarks = file => {
  const fileName = `${file.name.slice(0, file.name.lastIndexOf('.'))}.pdf`

  downloadFile(file.url, fileName)
}

export const downloadBodyFileWithWaterMarks = file => {
  const fileName = `${file.name.slice(0, file.name.lastIndexOf('.'))}.pdf`
  return addWaterMark(file.noMarksPdfUrl, file.type).then(url => {
    downloadFile(url, fileName)
  })
}

export const getIsFirstEnterFileTab = () => {
  // 判断是否第一次进去正文、签批单tab
  const isNewbie = !localStorage.getItem('official-bodyfiletab-entered')
  if (isNewbie) {
    localStorage.setItem('official-bodyfiletab-entered', 'entered')
    return true
  }
  return false
}

export const getBodyFileOperations = (
  allOperations,
  file,
  currentStep,
  hasOnlineEdit,
  isReceive,
) => {
  const hasEditPemission = allOperations.some(item =>
    [ALL_OPERATIONS.BODY_FILE_EDIT].includes(item),
  )
  const canRename = hasEditPemission && !file.isSealed
  const canEdit =
    hasEditPemission &&
    !file.isSealed &&
    // !!file.wpsFileId &&
    hasOnlineEdit &&
    UPLOAD_LIMIT_DOC_TYPE.includes(file.type)

  const hasUploadPermission = allOperations.includes(ALL_OPERATIONS.UPLOAD_DELETE)
  const canDelete =
    hasUploadPermission && !(currentStep && currentStep.stepType == STEP_TYPE.TOGETHER)

  const hasTaohongPermission = allOperations.includes(ALL_OPERATIONS.TAOHONG)
  const canTaoHong =
    hasTaohongPermission && !file.isSealed && UPLOAD_LIMIT_DOC_TYPE.includes(file.type)

  // const canStamp =
  //   allOperations.includes(ALL_OPERATIONS.STAMP) &&
  //   [...UPLOAD_LIMIT_PDF_TYPE, ...UPLOAD_LIMIT_DOC_TYPE].includes(file.type)

  const allBodyFileOperations = [
    {
      type: BODY_FILE_OPERATION.EDIT,
      name: '编辑',
      filter: !isReceive && canEdit,
    },
    {
      type: BODY_FILE_OPERATION.TAO_HONG,
      name: '套红',
      filter: canTaoHong,
    },
    // {
    //   type: BODY_FILE_OPERATION.STAMP,
    //   name: '盖章',
    //   filter: canStamp,
    // },
    {
      type: BODY_FILE_OPERATION.RENAME,
      name: '重命名',
      filter: canRename,
    },
    {
      type: BODY_FILE_OPERATION.PREVIEW,
      name: '预览',
      filter: true,
    },
    {
      type: BODY_FILE_OPERATION.DOWNLOAD,
      name: '下载',
      filter: true,
    },
    {
      type: BODY_FILE_OPERATION.DELETE,
      name: '删除',
      filter: canDelete,
    },
    // {
    //   type: BODY_FILE_OPERATION.PERMISSION,
    //   name: '设置权限',
    //   filter: canDelete,
    // },
  ]
  return allBodyFileOperations.filter(item => item.filter)
}

let stampPromise = null
let checkSealPromise = null
export const getStampInfo = () => {
  if (!stampPromise) {
    stampPromise = official
      .getOrgSealDataByUser({
        orgId: getOrgId(),
        uid: getUid(),
      })
      .then(({ data }) => {
        const stamps = Object.keys(data.sealData).map(key => ({
          sealId: key,
          seal: data.sealData[key],
        }))
        return stamps
      })
    checkSealPromise = official.checkSealInfo({ orgId: getOrgId() }).then(data => {
      return data.info
    })
  }
  return Promise.all([stampPromise, checkSealPromise]).then(data => {
    const [stamps, { isAuth, authType, balance }] = data
    return {
      stamps,
      isAuth,
      authType,
      balance,
    }
  })
}

export const getSubmitBodyFile = async ({ fileList, fieldsValue, index, id }) => {
  const { fields: remoteFields } = await official
    .getDocumentDetail({ orgId: getOrgId(), id })
    .then(res => res.data.info)
  const bodFileIndex = remoteFields.findIndex(field => field.fieldName == FIELD_TYPE.BODY_FILE)

  // 将本地正文和远程正文合并成要提交的正文
  const originalFileList = JSON.parse(fieldsValue[bodFileIndex])
  const remoteFileList = JSON.parse(remoteFields[bodFileIndex].value)
  const originalFile = originalFileList[index]
  const file = fileList[index]
  const remoteFile = remoteFileList[index]

  const isRemoteWpsFileIdChanged = originalFile.wpsFileId != remoteFile.wpsFileId
  const isLocalWpsFileIdChanged = originalFile.wpsFileId != file.wpsFileId
  const isRemoteMarksChanged =
    (remoteFile.marks && !originalFile.marks) ||
    (remoteFile.marks && originalFile.marks && remoteFile.marks.length != originalFile.marks.length)
  const isRemoteSealIdsChanged =
    (remoteFile.sealIds && !originalFile.sealIds) ||
    (remoteFile.sealIds &&
      originalFile.sealIds &&
      remoteFile.sealIds.length != originalFile.sealIds.length)
  const isLocalSealIdsChanged =
    (file.sealIds && !originalFile.sealIds) ||
    (file.sealIds && originalFile.sealIds && file.sealIds.length != originalFile.sealIds.length)
  const isRemoteNameChanged = remoteFile.name != originalFile.name
  const isLocalNameChanged = originalFile.name != file.name
  const isRemoteEditChanged = originalFile.originalUrl != remoteFile.originalUrl
  const isLocalEditChanged = originalFile.originalUrl != file.originalUrl
  if (isRemoteWpsFileIdChanged) {
    return {
      isConflict: true,
      bodyFile: remoteFileList,
    }
  }

  if (isRemoteSealIdsChanged) {
    return {
      isConflict: true,
      bodyFile: remoteFileList,
    }
  }

  if (
    isLocalWpsFileIdChanged &&
    (isRemoteNameChanged || isRemoteMarksChanged || isRemoteEditChanged)
  ) {
    return {
      isConflict: true,
      bodyFile: remoteFileList,
    }
  }

  if (
    isLocalSealIdsChanged &&
    (isRemoteNameChanged || isRemoteMarksChanged || isRemoteEditChanged)
  ) {
    return {
      isConflict: true,
      bodyFile: remoteFileList,
    }
  }

  if (isRemoteNameChanged && isLocalNameChanged && remoteFile.name != file.name) {
    return {
      isConflict: true,
      bodyFile: remoteFileList,
    }
  }

  const { marks } = remoteFile
  const name = isRemoteNameChanged ? remoteFile.name : file.name
  const originalUrl = isLocalEditChanged ? file.originalUrl : remoteFile.originalUrl
  const noMarksPdfUrl = isLocalEditChanged ? file.noMarksPdfUrl : remoteFile.noMarksPdfUrl
  let url = isLocalEditChanged ? file.url : remoteFile.url
  if (isLocalEditChanged && marks && marks.length) {
    url = await composePdfMarks(noMarksPdfUrl, marks)
  }
  const newFile = {
    ...file,
    marks,
    name,
    originalUrl,
    noMarksPdfUrl,
    url,
    downloadUrl: url,
  }
  remoteFileList.splice(index, 1, newFile)
  return remoteFileList
}

export const dealBodyFile = ({ id, bodyFile, operType, des }) => {
  official.dealDocumentBodyFile({
    id,
    orgId: getOrgId(),
    bodyFile,
    operType,
    description: des,
  })
}

export const getMergedBodyFile = ({ fileList, fieldsValue, id, index, operType, stepType }) => {
  if (
    !fileList ||
    !fieldsValue ||
    typeof id === 'undefined' ||
    typeof index === 'undefined' ||
    !operType
  ) {
    return Promise.reject(
      `getMergedBodyFile入参错误：
      fileList: ${fileList}, fieldsValue: ${fieldsValue}, id: ${id}, index: ${index}, operType: ${operType},stepType: ${stepType}`,
    )
  }
  let filesPromise
  if (stepType != STEP_TYPE.TOGETHER) {
    filesPromise = Promise.resolve(fileList)
  } else {
    filesPromise = getSubmitBodyFile({
      fileList,
      fieldsValue,
      index,
      id,
    }).then(result => {
      if (result.isConflict) {
        const { bodyFile } = result
        return new Promise((resolve, reject) => {
          new Confirm({
            content: '页面有其他人修改，请重新编辑',
            onClose: () => {
              reject(false)
            },
            onCancel: () => {
              reject(false)
            },
            onConfirm: () => {
              reject(bodyFile)
            },
          })
        })
      }
      return result
    })
  }
  return filesPromise.then(mergedFileList => {
    const list = [...fileList]
    const filename = list[index].name
    list.splice(index, 1, mergedFileList[index])
    dealBodyFile({
      id,
      bodyFile: JSON.stringify(mergedFileList),
      operType,
      des: `${OPER_TYPE_NAME[operType]}【${filename}】文件`,
    })
    return list
  })
}

export const taohong = (tplUrl, file) => {
  return official
    .taohong({
      tplUrl,
      docUrl: file.originalUrl,
    })
    .then(res => {
      const generateUrl = res.data
      return {
        ...file,
        originalUrl: generateUrl,
      }
    })
    .then(newFile => {
      if (!OPEN_ONLINE_EDIT) {
        return newFile
      }
      return official
        .getSourceId({
          prefix: 'gw',
        })
        .then(wpsFileId => ({
          ...newFile,
          wpsFileId,
        }))
    })
    .then(newFile => {
      return generateBodyFilePdfAndMarksPdfUrl(newFile).then(({ noMarksPdfUrl, marksPdfUrl }) => {
        newFile.noMarksPdfUrl = noMarksPdfUrl
        newFile.url = marksPdfUrl
        newFile.downloadUrl = marksPdfUrl
        return newFile
      })
    })
}
