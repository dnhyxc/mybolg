export const getRefNoArrJson = (refStr) => {
  const newDocNum = ['', '', '']

  if (!refStr) {
    return JSON.stringify(newDocNum)
  }
  const refNo = refStr.match(/([\s\S]*)〔(\d*)〕([\s\S]*)号/) || []
  refNo.forEach((d, index) => {
    if (index !== 0) {
      newDocNum[index - 1] = d.trim()
    }
  })

  return JSON.stringify(newDocNum)
}
