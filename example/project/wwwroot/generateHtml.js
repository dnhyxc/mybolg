// 生成下载公文所有的html
import moment from 'moment'
import _ from 'lodash'
import { FIELD_TYPE } from '../constant'

const tpl = `<!DOCTYPE html>
<html>
  <head>
    <title>TITLE</title>
    <meta
      name="apple-mobile-web-app-title"
      content="移动彩云，让工作沟通变得更便捷。"
    />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-orientation" content="portrait" />
    <style>
      body {
        padding: 40px 40px;
      }
      .content {
        border: 1px solid #f53939;
      }
      .title {
        padding-bottom: 20px;
        font-size: 24px;
        font-weight: 600;
        color: rgba(255, 77, 77, 1);
        text-align: center;
      }
      .block {
        padding-bottom: 30px;
        border-top: 1px solid #ff4d4d;
      }
      .block:first-child {
        border-top: none;
      }
      .block-title {
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        font-weight: 600;
        color: #F53939;
        text-align: left;
        font-size: 14px;
        border-bottom: 1px dashed #f53939;
      }
      .cell {
        padding-top: 10px;
        color: #262a30;
        vertical-align: top;
      }
      .cell:last-child{
        padding-right: 15px;
      }

      .value {
        word-break: break-all;
      }
      .label {
        padding-left: 20px;
        width: 86px;
        min-width: 86px;
        max-width: 86px;
        color: #F53939;
      }
      .label_flow{
        width: 43px;
        min-width: 43px;
        max-width: 43px;
      }
      .name {
        min-width: 43px;
      }
      .opinion {
        width: 100%;
        padding-left: 30px;
        padding-right: 62px;
        word-break: break-all;
      }
      .time {
        color: #5c626b;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div class="title">TITLE</div>
    <div class="content">
      <div class="block">
        <div class="block-title">基本信息</div>
        <table>
          <FIELDS>
            <tr>
              <td class="cell label">标题</td>
              <td class="cell">关于加强嘻嘻嘻嘻嘻嘻嘻</td>
            </tr>
            <tr>
              <td class="cell label">很长很长很长的label</td>
              <td class="cell">
                关于加强嘻嘻嘻嘻嘻嘻嘻关于加强嘻嘻嘻嘻嘻嘻嘻关于加强嘻嘻嘻嘻嘻嘻嘻关于加强嘻嘻嘻嘻嘻嘻嘻
              </td>
            </tr>
          </FIELDS>
        </table>
      </div>
      <div class="block">
        <div class="block-title">公文流程</div>
        <table>
          <STEPS>
            <tr>
              <td class="cell label label_flow">拟稿</td>
              <td class="cell name">陈如许</td>
              <td class="cell opinion">
                不仅干得好，还干得漂亮，弄得领导们很开心哈哈哈哈哈哈啊哈哈哈哈哈哈啊哈哈哈哈哈啊哈哈啊哈哈哈哈哈哈哈啊哈啊哈哈哈。
              </td>
              <td class="cell time">2018/10/17 18:32</td>
            </tr>
          </STEPS>
        </table>
      </div>
    </div>
  </body>
</html>
`
const getFieldsStr = (fields) => {
  return fields
    .map(
      (item) => `<tr>
        <td class="cell label">${item.name}:</td>
        <td class="cell value">${item.value}</td>
      </tr>`
    )
    .join('')
}
const getFlowRow = ({ stepName, name, opinion, time }) => {
  return `<tr>
    <td class="cell label">${stepName}${stepName ? ':' : ''}</td>
    <td class="cell name">${name}</td>
    <td class="cell opinion">${opinion || '-'}</td>
    <td class="cell time">${moment(time).format('YYYY/MM/DD HH:mm')}</td>
  </tr>`
}
const getFlowStr = (steps) => {
  let result = ''
  for (const step of steps) {
    for (const user of step.users) {
      // for (let user of _.get(user, 'approvers', [])) {
      //   result += getFlowRow({
      //     stepName: '(送审)',
      //     name: user.name,
      //     opinion: user.opinion,
      //     time: user.operTime,
      //   })
      // }
      result += getFlowRow({
        stepName: user == step.users[0] ? step.stepName : '',
        name: user.name,
        opinion: user.opinion,
        time: user.operTime,
      })
    }
  }
  return result
}
export default function generateHtml(fields = [], steps = []) {
  let result = tpl;
  const fieldsStr = getFieldsStr(fields);
  const flowStr = getFlowStr(steps);
  const title = _.get(
    fields.find((field) => field.fieldName == FIELD_TYPE.TITLE),
    'value',
    ''
  )
  result = result.replace(/TITLE/g, title)
  result = result.replace(/<FIELDS>[\s\S]*<\/FIELDS>/g, fieldsStr)
  result = result.replace(/<STEPS>[\s\S]*<\/STEPS>/g, flowStr)
  return result
}
