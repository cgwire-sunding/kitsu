export const getTaskPath = (
  task,
  production,
  isTVShow,
  episode,
  taskTypeMap
) => {
  const productionId =
    task.project_id ? task.project_id : production.id
  const route = {
    name: 'task',
    params: {
      production_id: productionId,
      task_id: task.id
    }
  }
  if (isTVShow && episode) {
    route.name = 'episode-task'
    route.params.episode_id = task.episode_id || episode.id
  }
  const taskType = taskTypeMap.get(task.task_type_id)
  if (taskType.for_entity === 'Shot') {
    route.params.type = 'shots'
  }
  if (taskType.for_entity === 'Asset') {
    route.params.type = 'assets'
  }
  if (taskType.for_entity === 'Edit') {
    route.params.type = 'edits'
  }
  return route
}

export const getTaskEntityPath = (task, episodeId) => {
  if (task) {
    let type = task.entity_type_name
    if (type !== 'Shot' && type !== 'Edit') {
      type = 'Asset'
    }
    const entityId = task.entity ? task.entity.id : task.entity_id
    const route = {
      name: type.toLowerCase(),
      params: {
        production_id: task.project_id
      }
    }
    route.params[`${route.name}_id`] = entityId

    if (episodeId) {
      route.name = `episode-${route.name}`
      route.params.episode_id = episodeId
    }
    return route
  } else {
    return {
      name: 'open-productions'
    }
  }
}

export const getEntityPath = (entityId, productionId, section, episodeId) => {
  const route = {
    name: section,
    params: {
      production_id: productionId
    }
  }

  if (episodeId) {
    route.name = `episode-${section}`
    route.params.episode_id = episodeId
  }

  if (section === 'shot') {
    route.params.shot_id = entityId
  } else if (section === 'asset') {
    route.params.asset_id = entityId
  } else if (section === 'edit') {
    route.params.edit_id = entityId
  }

  return route
}

const getProductionRoute = (name, productionId) => {
  return {
    name: name,
    params: {
      production_id: productionId
    }
  }
}

export const getProductionPath = (production, section = 'assets', episodeId) => {
  if (section === 'assetTypes') section = 'production-asset-types'
  if (section === 'newsFeed') section = 'news-feed'
  let route = getProductionRoute(section, production.id)
  if (production.production_type === 'tvshow' && ![
    'news-feed', 'schedule', 'production-settings', 'quota', 'team', 'episodes'
  ].includes(section)) {
    route = episodifyRoute(route, episodeId || 'all')
  }

  if (['assets', 'shots', 'edits'].includes(section)) {
    route.query = { search: '' }
  }

  return route
}

export const episodifyRoute = (route, episodeId) => {
  if (episodeId) {
    route.name = `episode-${route.name}`
    route.params.episode_id = episodeId
  }
  return route
}

export const getPlaylistPath = (prodId, episodeId, playlistId, section) => {
  const route = {
    name: section ? `${section}-playlist` : 'playlist',
    params: {
      production_id: prodId,
      playlist_id: playlistId
    }
  }
  return episodifyRoute(route, episodeId)
}

const getContextRoute = (name, productionId, episodeId) => {
  return episodifyRoute(getProductionRoute(name, productionId), episodeId)
}

export const getTaskTypeSchedulePath = (
  taskTypeId,
  productionId,
  episodeId,
  type
) => {
  const route = getContextRoute('task-type-schedule', productionId, episodeId)
  route.params.task_type_id = taskTypeId
  route.params.type = type
  return route
}

export const getProductionSchedulePath = (productionId) => {
  return getProductionRoute('schedule', productionId)
}
