// import { WpsAddonMgr } from 'wpsjs-rpc-sdk'
import { WpsAddonMgr } from './wpsjsrpcsdk'
// import { pluginsMode } from './constans'

const prevBase = '/'

const curList = [
  { name: 'WpsOAAssist', addonType: 'wps', online: 'true', url: `${prevBase}WpsOAAssist/` },
]
let localList = []
const publishIndex = 0
const publishUnIndex = 0

export function installWpsAddin(prefix, callBack) {
  curList[0].url = `${prefix}WpsOAAssist/`

  WpsAddonMgr.getAllConfig((e) => {
    if (!e.response || e.response.indexOf('null') >= 0) {
      if (curList.length > 0) {
        installWpsAddinOne(callBack)
      }
    } else {
      localList = JSON.parse(e.response)
      unInstallWpsAddinOne(callBack)
    }
  })
}

export function installWpsAddinOne(callBack) {
  WpsAddonMgr.enable(curList[publishIndex], (e) => {
    if (e.status) {
      console.log(e.msg)
    } else {
      console.log('Install success')
    }

    callBack && callBack()

    // publishIndex++
    // if (publishIndex < curList.length) {
    //   installWpsAddinOne()
    // } else {
    //   callBack && callBack()
    // }
  })
}

export function unInstallWpsAddinOne(callBack) {
  WpsAddonMgr.disable(localList[publishUnIndex], (e) => {
    if (e.status) {
      console.log(e.msg)
    } else {
      console.log('unInstall success')
    }

    installWpsAddinOne(callBack)

    // publishUnIndex++
    // if (publishUnIndex < localList.length) {
    //   unInstallWpsAddinOne(callBack)
    // } else if (curList.length > 0) {
    //   installWpsAddinOne(callBack)
    // }
  })
}
