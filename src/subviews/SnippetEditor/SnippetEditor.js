import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import Modal from 'components/Modal'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Editor from 'components/Editor'
import Error from 'components/Error'
import { Button } from 'components/Button'
import ExtSelect from 'subviews/ExtSelect'
import TagSelect from 'subviews/TagSelect'
import { styler, colors, images, rem, breakpoints } from 'styles'
import { validate, tests } from 'utils/vali'
import Connector from 'utils/connector'

const customTests = {
  title: {
    test: tests.chars.test,
    error: 'タイトルを入力してください。',
  },
  contents: {
    test: tests.chars.test,
    error: 'スニペットを入力してください。',
  },
}

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '30px 40px',
    [breakpoints.phone]: {
      padding: '30px 15px',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 60,
  },
  logo: {
    width: 35,
    height: 30,
    objectFit: 'contain',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    color: colors.black,
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 30,
  },
  editorTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  editorLabel: {
    fontSize: 14,
    color: colors.darkGray,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '48%',
    height: 50,
    marginTop: 30,
  },
})

const defaultInputs = {
  title: '',
  tags: [],
  contents: '',
  ext: 'text',
  desc: '',
}

const SnippetEditor = ({
  actions,
  folderId,
  selected,
  kind,
  data,
  isOpen,
  tags,
  toggleModal,
  style,
}) => {
  // props
  const title = data ? 'スニペット編集' : 'スニペット追加'
  const submitTitle = data ? '更新' : '追加'

  // state
  const [isLoading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [resErr, setResErr] = useState('')
  const [inputs, setInputs] = useState(
    data ? { ...data } : { ...defaultInputs },
  )

  // lifecycle
  useEffect(() => {
    setInputs(data ? { ...data } : { ...defaultInputs })
  }, [data])

  // handler
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    setInputs({ ...inputs, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async () => {
    // validation
    const result = validate(inputs, customTests)
    setErrors(result.errors)
    if (result.isError) return

    try {
      setLoading(true)

      // add/edit snippet
      const newAll = !data
        ? await actions.addSnippet({ folderId, snippet: inputs })
        : await actions.updateSnippet({
            folderId,
            snippetId: data.id,
            snippet: inputs,
          })

      // update selected
      if (kind === 'folder') {
        const selectedFolder = newAll.folders.find(x => x.id === folderId)
        actions.setSelected({ selected: selectedFolder, kind: 'folder' })
      } else if (kind === 'ext' || kind === 'tag') {
        actions.setSelected({ selected, kind })
      }

      if (!data) setInputs({ ...defaultInputs })
      setLoading(false)
      toggleModal()
    } catch (err) {
      setResErr(err.message)
      setLoading(false)
    }
  }

  // rendering
  return (
    <Modal size="lg" isOpen={isOpen} toggleModal={toggleModal}>
      <div className={styles.root} style={style}>
        <div className={styles.top}>
          <img src={images.logo} className={styles.logo} alt="snippet" />
          <aside className={styles.title}>{title}</aside>
        </div>
        <Error label={resErr} />
        <div>
          <Input
            label="タイトル"
            name="title"
            value={inputs.title}
            placeholder="タイトル名"
            onChange={handleInputChange}
            error={errors.title}
            mandatory
          />
          <TagSelect
            value={inputs.tags}
            options={tags}
            onChange={handleInputChange}
          />
          <div className={styles.editorContainer}>
            <div className={styles.editorTop}>
              <aside className={styles.editorLabel}>スニペット</aside>
              <ExtSelect value={inputs.ext} onChange={handleInputChange} />
            </div>
            <Editor
              name="contents"
              value={inputs.contents}
              ext={inputs.ext}
              error={errors.contents}
              onChange={handleInputChange}
              textareaStyle={rem({
                minHeight: 150,
              })}
            />
          </div>
          <Textarea
            label="備考"
            name="desc"
            value={inputs.desc}
            onChange={handleInputChange}
            placeholder="メモ..."
          />
          <div className={styles.bottom}>
            <Button
              label={submitTitle}
              className={`btn-yellow ${styles.button}`}
              onClick={handleSubmit}
              isLoading={isLoading}
            />
            <Button
              label="キャンセル"
              className={`btn-black-outline ${styles.button}`}
              onClick={toggleModal}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

SnippetEditor.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.shape({}),
  actions: PropTypes.shape({}),
  folderId: PropTypes.string,
  selected: PropTypes.shape({}),
  kind: PropTypes.string,
  style: PropTypes.shape({}),
}

SnippetEditor.defaultProps = {
  tags: [],
  data: null,
  actions: {},
  folderId: null,
  selected: null,
  kind: 'folder',
  style: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        data: { all },
        select: { selected, kind },
      },
    }) => (
      <SnippetEditor
        actions={{ ...actions.data, ...actions.select }}
        folderId={selected && selected.id}
        selected={selected}
        kind={kind}
        tags={(all && all.tags && Object.keys(all.tags)) || []}
        {...props}
      />
    )}
  </Connector>
)
