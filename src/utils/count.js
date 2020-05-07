/* eslint-disable no-unused-expressions */
const getFolders = all => {
  if (!all || (all && !all.folders)) return null
  return all.folders
}

export const countTagsAndExts = all => {
  const tags = {}
  const exts = {}

  const folders = getFolders(all)
  if (!folders) return { tags, exts }

  folders.forEach(x => {
    x.snippets &&
      x.snippets.forEach(y => {
        y.tags &&
          y.tags.forEach(key => {
            const val = tags[key]
            tags[key] = val ? val + 1 : 1
          })

        if (y.ext) {
          const key = y.ext
          const val = exts[key]
          exts[key] = val ? val + 1 : 1
        }
      })
  })

  return { tags, exts }
}
