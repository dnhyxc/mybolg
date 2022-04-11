import { LEVEL_CODE } from 'ROOT/constant'

/**
 * 获取下一级人
 *
 * @param {*} levelCode 人员code
 * @returns
 */
export const getNextCode = (levelCode) => {
  switch (levelCode) {
    default: {
      return []
    }

    case LEVEL_CODE.BOSS: {
      return [
        [LEVEL_CODE.SUB_BOSS],
        [LEVEL_CODE.DEPT_BOSS],
      ]
    }

    case LEVEL_CODE.SUB_BOSS: {
      return [
        [LEVEL_CODE.DEPT_BOSS],
      ]
    }

    case LEVEL_CODE.DEPT_BOSS: {
      return [
        [LEVEL_CODE.DEPT_MANAGER, LEVEL_CODE.OFFICES_MANAGER],
      ]
    }

    case LEVEL_CODE.DEPT_MANAGER:
    case LEVEL_CODE.OFFICES_MANAGER: {
      return [
        [LEVEL_CODE.STAFF],
      ]
    }
  }
}
