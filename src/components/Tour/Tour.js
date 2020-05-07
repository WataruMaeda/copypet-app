import React from 'react'
import { PropTypes } from 'prop-types'
import Tour from 'reactour'
import { useMediaQuery } from 'react-responsive'
import { colors } from 'styles'
import Connector from 'utils/connector'

const deskSteps = [
  {
    selector: '[data-tut="reactour__folder"]',
    content: 'スニペットを管理するフォルダです。',
  },
  {
    selector: '[data-tut="reactour__add"]',
    content: '新しいフォルダを追加できます。',
  },
  {
    selector: '[data-tut="reactour__ext"]',
    content:
      '拡張子ごとにスニペットを分類します。スニペットを作成する際、拡張子を指定します。',
  },
  {
    selector: '[data-tut="reactour__tag"]',
    content:
      'タグごとにスニペットを分類します。スニペットを作成する際、タグを追加します。',
  },
  {
    selector: '[data-tut="reactour__search"]',
    content: 'スニペットを検索できます。キーワードを含スニペットを表示します。',
  },
  {
    selector: '[data-tut="reactour__snippet_list"]',
    content:
      'スニペット一覧を表示します。項目を選択すると、指定のスニペットまでスクロールします。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header"]',
    content: 'グループの概要を表示します。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_edit"]',
    content: 'フォルダを編集できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_del"]',
    content: 'フォルダを削除できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_add"]',
    content: 'スニペットを追加できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_menu"]',
    content: 'スニペットの編集、削除ができます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_toggle"]',
    content: '追加したスニペットです。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_copy"]',
    content: 'スニペットをコピーできます。',
  },
]

const mobSteps = [
  {
    selector: '[data-tut="reactour__folder_mob"]',
    content: 'スニペットを管理するフォルダです。',
  },
  {
    selector: '[data-tut="reactour__add_mob"]',
    content: '新しいフォルダを追加できます。',
  },
  {
    selector: '[data-tut="reactour__ext_mob"]',
    content:
      '拡張子ごとにスニペットを分類します。スニペットを作成する際、拡張子を指定します。',
  },
  {
    selector: '[data-tut="reactour__tag_mob"]',
    content:
      'タグごとにスニペットを分類します。スニペットを作成する際、タグを追加します。',
  },
  {
    selector: '[data-tut="reactour__search_mob"]',
    content: 'スニペットを検索できます。キーワードを含スニペットを表示します。',
  },
  {
    selector: '[data-tut="reactour__snippet_list_mob"]',
    content:
      'スニペット一覧を表示します。項目を選択すると、指定のスニペットまでスクロールします。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header"]',
    content: 'グループの概要を表示します。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_edit"]',
    content: 'フォルダを編集できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_del"]',
    content: 'フォルダを削除できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_header_add"]',
    content: 'スニペットを追加できます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_menu"]',
    content: 'スニペットの編集、削除ができます。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_toggle"]',
    content: '追加したスニペットです。',
  },
  {
    selector: '[data-tut="reactour__snippet_snippet_copy"]',
    content: 'スニペットをコピーできます。',
  },
]

const TourWrapper = ({ actions, isOpenTour }) => {
  // handler
  const handleOpen = () => actions.setOpenTour(!isOpenTour)

  // props
  const isPhone = useMediaQuery({ query: '(max-width: 576px)' })

  // rendering
  return (
    <Tour
      isOpen={isOpenTour}
      steps={isPhone ? mobSteps : deskSteps}
      accentColor={colors.yellow}
      onRequestClose={handleOpen}
      rounded={5}
    />
  )
}

TourWrapper.propTypes = {
  actions: PropTypes.shape({}),
  isOpenTour: PropTypes.bool,
}

TourWrapper.defaultProps = {
  actions: {},
  isOpenTour: false,
}

export default props => (
  <Connector>
    {({ actions, state: { app } }) => (
      <TourWrapper actions={actions.app} {...app} {...props} />
    )}
  </Connector>
)
