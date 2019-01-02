import {
  buildNameIndex,
  indexSearch
} from './indexing'

const EQUAL_REGEX = /([^ ]*)=([^ ]*)|\[(.*)\]=([^ ]*)/g

/*
 * Look in the search query for task type filter like anim=wip.
 * Then apply filters found on result list.
 */
export const applyFilters = (entries, filters, taskMap) => {
  const isStatus = { status: true }
  const isAssignation = { assignation: true }
  const isExclusion = { exclusion: true }

  if (filters && filters.length > 0) {
    return entries.filter((entry) => {
      let isOk = true
      filters.forEach((filter) => {
        let task = null
        if (!isOk) return false

        if (filter.taskType && entry.validations[filter.taskType.id]) {
          task = taskMap[entry.validations[filter.taskType.id]]
        }
        if (isStatus[filter.type]) {
          isOk = task && task.task_status_id === filter.taskStatus.id
        } else if (isAssignation[filter.type]) {
          if (filter.assigned) {
            isOk = task && task.assignees && task.assignees.length > 0
          } else {
            isOk = !task ||
              (task && task.assignees && task.assignees.length === 0)
          }
        } else if (isExclusion[filter.type]) {
          isOk = !filter.excludedIds[entry.id]
        }
      })
      return isOk
    })
  } else {
    return entries
  }
}

/**
 * Extract keywords from a given text. Remove equality and exclusion
 * expressions.
 */
export const getKeyWords = (queryText) => {
  if (!queryText) {
    return []
  } else {
    return queryText
      .replace(EQUAL_REGEX, '')
      .split(' ')
      .filter((query) => {
        return query.length > 0 && query[0] !== '-'
      })
  }
}

/**
 * Extract excluding keywords from a given text. Remove equality expresions
 * and tradition keywords.
 */
export const getExcludingKeyWords = (queryText) => {
  return queryText
    .replace(EQUAL_REGEX, '')
    .split(' ')
    .filter((keyword) => {
      return keyword.length > 0 && keyword[0] === '-'
    })
    .map(keyword => keyword.substring(1))
}

/*
 * Build all filters data struct generated by a query and return them as
 * an array. It includes:
 * * status filters
 * * assignation filters
 * * exclusion filters
 */
export const getFilters = (
  entryIndex, taskTypes, taskStatuses, query
) => {
  const filters = getTaskTypeFilters(taskTypes, taskStatuses, query)
  const excludingKeywords = getExcludingKeyWords(query) || []
  excludingKeywords.forEach((keyword) => {
    let excludedMap = {}
    let excludedEntries = indexSearch(entryIndex, [keyword]) || []
    excludedEntries.forEach((entry) => {
      excludedMap[entry.id] = true
    })
    filters.push({
      type: 'exclusion',
      excludedIds: excludedMap
    })
  })
  return filters
}

/*
 * Extract task type filters (like anim=wip or [mode facial]=wip) from given
 * query.
 */
export const getTaskTypeFilters = (
  taskTypes,
  taskStatuses,
  queryText
) => {
  if (!queryText) return []

  const results = []
  const rgxMatches = queryText.match(EQUAL_REGEX)
  const taskTypeNameIndex = buildNameIndex(taskTypes, false)
  const taskStatusShortNameIndex = {}
  taskStatuses.forEach((taskStatus) => {
    taskStatusShortNameIndex[taskStatus.short_name] = taskStatus
  })

  if (rgxMatches) {
    rgxMatches.forEach((rgxMatch) => {
      const pattern = rgxMatch.split('=')
      const value = pattern[1]
      let taskTypeName = pattern[0]
      if (taskTypeName[0] === '[') {
        taskTypeName = taskTypeName.substring(1, taskTypeName.length - 1)
      }
      const taskTypes = taskTypeNameIndex[taskTypeName.toLowerCase()]
      if (taskTypes) {
        if (value === 'unassigned') {
          results.push({
            taskType: taskTypes[0],
            assigned: false,
            type: 'assignation'
          })
        } else if (value === 'assigned') {
          results.push({
            taskType: taskTypes[0],
            assigned: true,
            type: 'assignation'
          })
        } else if (taskStatusShortNameIndex[value]) {
          results.push({
            taskType: taskTypes[0],
            taskStatus: taskStatusShortNameIndex[value],
            type: 'status'
          })
        }
      }
    })
  }
  return results
}