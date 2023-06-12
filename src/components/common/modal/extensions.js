import { isString } from 'lodash'

export const formatContent = (content) => {
  if (isString(content) && (content.includes('*') || content.includes('|'))) {
    let tagOpen = true
    const list = content.split('*')
    if (list.length % 2 !== 0) {
      content = list.reduce((a, b) => {
        const newValue = a + (tagOpen ? '<span class="text-hightlight">' : '</span>') + b
        tagOpen = !tagOpen
        return newValue
      })
    }
    content = content.replace(/\|+/g, '<br />')

    content = (
      <span
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    )
  }
  return content
}
