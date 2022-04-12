import { EVENTS, OPER_TYPE } from 'ROOT/constant'
import Event from 'ROOT/events'
import { official } from 'ROOT/service'
import { globalStore } from '@xm/util'
import Cookies from 'js-cookie'
import { message, Modal } from 'antd'

import { isWindow } from 'ROOT/wpsutils'
import { generateBodyFilePdfAndMarksPdfUrl } from './index'
import {
  getDocStatus,
  openDoc,
  downLoadFile,
  // op,
  getIsRunning,
  exitWPS,
} from './wpsroot/wps'
import { installWpsAddin } from './wpsroot/loaderbuild'

const orgId = globalStore.get('orgId')
const uid = globalStore.get('uid')
const name = globalStore.get('name')

const getOrgId = () => orgId
const getUid = () => uid
const getUserName = () => name

// wps cookie 变量 index -> docid
const WPSFileMap = '_WPSFileMap_'

const mimeTypeMap = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}


/**
 * 启动 WPS 前置
 *
 * @param {Function} [callback=() => {}]
 * @param {boolean} [isCheck=false]
 */
function startOutWps(callback = () => { }, isCheck = false) {
  if (!isWindow) {
    message.error('当前操作系统不支持在线编辑！')
    return
  }

  if (!callback) {
    console.error('缺少执行函数')
    return
  }

  const checkStatus = (notCheck) => {
    return new Promise((resolve, reject) => {
      if (!isCheck || notCheck) {
        resolve(true)
        return
      }

      if (!getHasMask()) {
        resolve(true)
        return
      }

      Modal.warning({
        title: 'WPS提醒',
        content: '当前有文档正在编辑，请结束后再编辑',
        okText: '知道了',
        cancelText: '取消',
      })
      reject()


      // getDocStatus({
      //   status: (statusRes) => {
      //     if (statusRes) {
      //       Modal.warning({
      //         title: 'WPS提醒',
      //         content: '当前有文档正在编辑，请结束后再编辑',
      //         okText: '知道了',
      //         cancelText: '取消',
      //       })
      //       reject()
      //       return
      //     }
      //     resolve(true)
      //   },
      // })
    })
  }

  getIsRunning().then((res) => {
    if (res.response === 'Client is running.') {
      checkStatus().then(callback)
      return
    }

    let prefixBase = STATIC_PREFIX
    if (/^\/\//.test(prefixBase)) {
      prefixBase = `${location.protocol}${prefixBase}`
    }
    installWpsAddin(prefixBase, () => {
      checkStatus(true).then(callback)
    })
  })
}

/**
 * 保存文件回调
 *
 * @param {*} options
 * @param {*} [res={}]
 * @param {*} [features={}]
 */
function saveFile(options, res = {}, features = {}) {
  const { fileList = [], index, callback } = options || {}
  const currentFile = fileList[index]

  const { fileUrl } = res
  const { isTaohong } = features || {}

  generateBodyFilePdfAndMarksPdfUrl({
    ...currentFile,
    originalUrl: fileUrl,
  })
    .then(({ noMarksPdfUrl, marksPdfUrl }) => {
      const resultFile = {
        ...currentFile,
        originalUrl: fileUrl,
        noMarksPdfUrl,
        url: marksPdfUrl,
        downloadUrl: marksPdfUrl,
        isTaohong,
      }
      if (isTaohong) {
        resultFile.taohongUrl = fileUrl
      }

      callback(index, resultFile)
    })
    .catch(() => {
      // 失败了
      message.error('转换文件失败！')
    })
}

let globalMaskEl = null

export function getHasMask() {
  return !!globalMaskEl
}

export function getWpsEditing() {
  return new Promise((resolve) => {
    getIsRunning().then((res) => {
      if (res.response !== 'Client is running.') {
        resolve(false)
        return
      }
      getDocStatus({
        status: (statusRes) => {
          resolve(!!statusRes)
        },
      })
    })
  })
}

let removing = false

export const wpsMask = {
  async init(isEdit = false) {
    const creatMask = () => {
      if (globalMaskEl) {
        return
      }
      globalMaskEl = createMaskElement()
      globalMaskEl.addEventListener('click', async () => {
        if (removing) {
          return
        }
        removing = true

        const hasEdit = await getWpsEditing()
        if (hasEdit) {
          message.warning('当前有文档正在编辑')
          return
        }
        document.body.removeChild(globalMaskEl)
        globalMaskEl = null
        removing = false
      })
      document.body.appendChild(globalMaskEl)
    }

    if (isEdit) {
      creatMask()
      return
    }

    const hasEdit = await getWpsEditing()
    if (!hasEdit) {
      return
    }
    creatMask()
  },

  remove() {
    if (globalMaskEl) {
      document.body.removeChild(globalMaskEl)
      globalMaskEl = null
    }
  },
}

window.WPSMask = wpsMask

/**
 * 打开外部 WPS 程序在线编辑
 *
 * @export
 * @param {object} params 在线编辑需要的信息
 * @param {object[]} params.fileList 文件信息对象数组
 * @param {number} params.index 文件所在值中的索引
 * @param {string|number} params.id 公文ID
 * @param {boolean} params.isNew 是否是新建公文
 * @param {object} params.fieldObj 字段对象
 * @param {string} params.insertFileUrl 红头模板 URL
 * @param {Function} callback 回调函数
 */
export function outWpsEdit(params = {}, callback) {
  const {
    fileList = [],
    index,
    id,
    isNew,
    fieldObj,
    insertFileUrl = '',
    bodyTemplateUrl = '',
  } = params || {}

  const isCreate = index < 0
  if (!isCreate && fileList.length === 0) {
    return
  }

  const currentFile = fileList[index]

  if (!isCreate && !currentFile) {
    return
  }

  if (!isCreate && !['doc', 'docx'].includes(currentFile.type)) {
    message.error('非 word 文档不可在线编辑')
    return
  }

  startOutWps(() => {
    const { originalUrl, noRedHeadOriginalUrl, type, name: fileName } = currentFile || {}

    const newFileName = '正文.docx'

    const operType = isCreate ? OPER_TYPE.CREATE : OPER_TYPE.MODIFY_FILE
    const dealDescription = isCreate ? `创建【${newFileName}】文件` : `修改【${currentFile.name}】文件`
    const editUrl = noRedHeadOriginalUrl || originalUrl

    wpsMask.init(true)

    openDoc({
      // docId: file.key,
      isNew,
      orgId: getOrgId(),
      docId: 123456789,
      userName: getUserName(),
      filePath: isCreate ? undefined : `${editUrl}&contenttype=${mimeTypeMap[type]}`,
      fileName,
      newFileName,
      bodyTemplateUrl,
      insertFileUrl,
      templateDataUrl: '/access/DocumentMoaSetting/getBodyFileList',
      // templateDataUrl: '/access/DocumentMoa/getDocumentBodyFileList',
      uploadPath: '/sfs/webUpload/file',
      params: {
        id,
        orgId: getOrgId(),
        file: isCreate ? undefined : currentFile,
        index,
        list: fileList || [],
        operType, // create: 4 mod: 12
        dealDescription,
        isNew,
        fieldObj,
      },
    }, {
      open: (docId) => {
        const fileMap = Cookies.getJSON(WPSFileMap) || {}
        fileMap[index] = docId
        Cookies.set(WPSFileMap, fileMap)
      },
      save: (res, features = {}) => {
        // saveFile(
        //   {
        //     fileList,
        //     index,
        //     callback,
        //   },
        //   res,
        //   features,
        // )
        const { id: gId, list } = res
        callback(gId, list)
        // wpsMask.remove()
      },
      exit: (docId) => {
        const fileMap = Cookies.getJSON(WPSFileMap)
        if (!fileMap) {
          return
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const i in fileMap) {
          if (fileMap[i] === docId) {
            delete fileMap[i]
            Cookies.set(WPSFileMap, fileMap)
            return
          }
        }
      },
    })
  }, true)
}

export const wpsEdit = async (file, callback) => {
  let wpsFileId;
  let newFile = file;
  const orgId = getOrgId()
  if (!file) {
    wpsFileId = await official.getSourceId({ prefix: 'gw' })
    newFile = { wpsFileId, type: 'docx', name: '新建文档.docx' }
  } else {
    wpsFileId = file.wpsFileId
  }
  let wpsUrl
  if (!file) {
    wpsUrl = await official.getNewFileWpsUrl({
      orgId,
      sourceId: wpsFileId,
      name: '新建文档.docx',
    })
  } else {
    wpsUrl = await official.getExistFileWpsUrl({
      orgId,
      sourceId: wpsFileId,
      name: file.name,
      fileSize: file.size || 0, // wps编辑的文件没有size，接口又必传，与后端约定为随便传一个数字
      url: file.originalUrl,
    })
  }

  //
  wpsUrl += `&wpsUid=${getUid()}`

  // 同一个文件在线编辑只打开一个窗口，所以传入wpsFileId作为窗口名
  // this.wpsWindow = window.open(wpsUrl, wpsFileId)
  let openWindowRef
  if (!window.nwGui) {
    openWindowRef = window.open('about:blank')
    openWindowRef.location.replace(wpsUrl)
  } else {
    openWindowRef = window.open(wpsUrl)
  }
  // return { openWindowRef, file: newFile }
  const msgHandler = async (msg) => {
    const { wpsFileId: msgWpsFileId, url } = getFileInfoFromSaveMsg(msg)
    if (wpsFileId != msgWpsFileId) return
    newFile.originalUrl = url
    const { noMarksPdfUrl, marksPdfUrl } = await generateBodyFilePdfAndMarksPdfUrl(newFile)
    newFile.noMarksPdfUrl = noMarksPdfUrl
    newFile.url = marksPdfUrl
    newFile.downloadUrl = marksPdfUrl
    callback && callback(newFile)
  }
  Event.on(EVENTS.OPERATION_MSG, msgHandler)
  const maskEl = createMaskElement()
  maskEl.addEventListener('click', () => {
    setTimeout(() => {
      Event.off(EVENTS.OPERATION_MSG, msgHandler)
    }, 5000)
    document.body.removeChild(maskEl)
  })
  document.body.appendChild(maskEl)
}

const createMaskElement = () => {
  const el = document.createElement('div')
  el.textContent = 'wps编辑中,点击关闭'
  el.style.cssText = `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  text-align: center;
  padding-top: 20%;
  color: #fff;
  font-size: 16px;
  `
  return el
}

/**
 * 打开外部 WPS 程序在线套红
 *
 * @export
 * @param {string} tplUrl 套红模板url
 * @param {object[]} fileList 正文数据列表
 * @param {number} index 操作文件的索引
 * @param {string|number} id 公文ID
 * @param {Function} callback 回调
 */
export function outTaohong(tplUrl, fileList, index, id, callback) {
  if (fileList.length === 0) {
    return
  }

  const currentFile = fileList[index]
  if (!currentFile || !tplUrl) {
    return
  }

  if (!['doc', 'docx'].includes(currentFile.type)) {
    message.error('非 word 文档不可套红')
    return
  }

  startOutWps(() => {
    const { originalUrl, type, name } = currentFile || {}

    const params = {
      userName: getUserName(),
      // bookMarksStart: '正文内容B',
      // bookMarksEnd: '正文内容E',
      // filePath: 'http://127.0.0.1:3888/file/样章.docx',
      // filePath: `${originalUrl}&contenttype=application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
      // filePath: `${originalUrl}&contenttype=application/msword&filename=a.doc`,
      // filePath: `${originalUrl}&contenttype=${mimeTypeMap[type]}&filename=${file.name}`,
      docId: 123456789,
      filePath: `${originalUrl}&contenttype=${mimeTypeMap[type]}`,
      fileName: name,
      uploadPath: '/sfs/webUpload/file',
      insertFileUrl: tplUrl,
      params: {
        id,
        orgId: getOrgId(),
        file: currentFile,
        index,
        list: fileList || [],
        operType: OPER_TYPE.TAOHONG,
        dealDescription: `套红【${currentFile.name}】文件`,
      },
    }

    // insertRedHeader(params, {
    openDoc(params, {
      open: (docId) => {
        const fileMap = Cookies.getJSON(WPSFileMap) || {}
        fileMap[index] = docId
        Cookies.set(WPSFileMap, fileMap)
      },
      save: (res, features = {}) => {
        callback()
      },
      exit: (docId) => {
        const fileMap = Cookies.getJSON(WPSFileMap)
        if (!fileMap) {
          return
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const i in fileMap) {
          if (fileMap[i] === docId) {
            delete fileMap[i]
            Cookies.set(WPSFileMap, fileMap)
            return
          }
        }
      },
    })
  }, true)


  // return official
  //   .taohong({
  //     tplUrl,
  //     docUrl: file.originalUrl,
  //   })
  //   .then((res) => {
  //     const generateUrl = res.data
  //     return {
  //       ...file,
  //       originalUrl: generateUrl,
  //     }
  //   })
  //   .then((newFile) => {
  //     if (!OPEN_ONLINE_EDIT) {
  //       return newFile
  //     }
  //     return official
  //       .getSourceId({
  //         prefix: 'gw',
  //       })
  //       .then((wpsFileId) => ({
  //         ...newFile,
  //         wpsFileId,
  //       }))
  //   })
  //   .then((newFile) => {
  //     return generateBodyFilePdfAndMarksPdfUrl(newFile).then(({ noMarksPdfUrl, marksPdfUrl }) => {
  //       newFile.noMarksPdfUrl = noMarksPdfUrl
  //       newFile.url = marksPdfUrl
  //       newFile.downloadUrl = marksPdfUrl
  //       return newFile
  //     })
  //   })
}

/**
 * 打开外部 WPS 程序在线创建文档
 *
 * @export
 * @param {object[]} fileList 文件信息对象数组
 * @param {string|number} id 公文ID
 * @param {boolean} isNew 是否是新建公文
 * @param {object} fieldObj 字段对象
 * @param {Function} callback 回调函数
 */
export function outWpsCreate(fileList = [], id, isNew, fieldObj, callback) {
  outWpsEdit(fileList, -1, id, isNew, fieldObj, callback)
}

export const getFileInfoFromSaveMsg = (msg) => {
  let { extdata } = msg.message
  try {
    extdata = JSON.parse(extdata)
  } catch (error) {
    console.log('handleWpsFileSaveMsg JSON.parse', error)
  }

  const wpsFileId = extdata.sourceId
  const { url } = extdata
  return {
    wpsFileId,
    url,
  }
}

/**
 * 打开外部 WPS 程序下载并加水印
 *
 * @export
 * @param {object[]} file 文件信息对象
 */
export function outWpsDownload(file) {
  if (!file) {
    message.error('下载文件出错！')
    return
  }

  startOutWps(() => {
    const { originalUrl, type, name: fileName } = file || {}

    downLoadFile({
      docId: file.key,
      userName: getUserName(),
      filePath: `${originalUrl}&contenttype=${mimeTypeMap[type]}`,
      fileName,
      watermark: 'aaaabbbb',
      // params: JSON.stringify({

      // }),
    }, {
    })
  }, false)
}

/**
 * 通知 WPS 关闭
 *
 * @export
 * @param {*} isForce
 */
export function exitWPSV(isForce) {
  if (isWindow && exitWPS) {
    getIsRunning().then((res) => {
      if (res.response === 'Client is running.') {
        exitWPS(isForce)
      }
    })
  }
}
