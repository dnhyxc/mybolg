// import { WpsInvoke } from 'wpsjs-rpc-sdk'
import { WpsInvoke } from './wpsjsrpcsdk'

export const pluginsMode = 1;
export const pluginType = WpsInvoke.ClientType.wps // 加载项类型wps,et,wpp
export const pluginName = 'WpsOAAssist'; // 加载项名称
// export const wpsClient = new WpsClient(pluginType);// 初始化一个多进程对象，多进程时才需要
export const clientStr = `${pluginName + pluginType }ClientId`
