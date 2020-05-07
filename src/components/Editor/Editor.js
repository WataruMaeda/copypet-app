import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor'
import { IconButton } from 'components/Button'
import { styler, colors, rem } from 'styles'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-scala'
import 'prismjs/themes/prism.css'
import './editor.css'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },
  label: {
    fontSize: 14,
    display: 'flex',
    height: 'auto',
    color: colors.gray,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colors.darkGray,
    marginTop: 5,
  },
  editor: {
    flex: 1,
    overflow: 'auto',
    fontSize: 14,
    border: `1px solid ${colors.lightGray}`,
    background: colors.black,
    color: 'white !important',
    maxWidth: '100%',
    borderRadius: 4,
  },
  error: {
    fontSize: 13,
    color: '#dc3546',
    marginTop: 5,
  },
  toggleButton: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    top: 10,
    right: 10,
    background: colors.lightBlack,
    borderRadius: 16,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 24,
  },
  toggleButtonBottom: {
    color: 'white',
    fontSize: 16,
    background: colors.lightWhite,
  },
  toggleButtonIcon: {
    marginRight: '0 !important',
  },
})

const getLanguage = ext => {
  switch (ext) {
    case 'markup':
      return languages.markup
    case 'css':
      return languages.css
    case 'js':
      return languages.js
    case 'sql':
      return languages.sql
    case 'c':
      return languages.clike
    case 'swift':
      return languages.swift
    case 'kotlin':
      return languages.kotlin
    case 'java':
      return languages.java
    case 'dart':
      return languages.dart
    case 'python':
      return languages.python
    case 'go':
      return languages.go
    case 'ruby':
      return languages.ruby
    case 'json':
      return languages.json
    case 'perl':
      return languages.perl
    case 'rust':
      return languages.rust
    case 'scala':
      return languages.scala
    default:
      return []
  }
}

const SnippetEditor = ({
  ext,
  name,
  label,
  value,
  error,
  rows,
  onChange,
  placeholder,
  mandatory,
  disabled,
  style,
  textareaStyle,
  maxHeight,
}) => {
  // props
  const setToggle = typeof maxHeight === 'number'

  // state
  const ref = useRef(null)
  const [editorHeight, setEditorHeight] = useState('auto')
  const [originalHeight, setOriginalHeight] = useState('auto')
  const [isBiggerThanMax, setBiggerThanMax] = useState(null)
  const [isOpen, setOpen] = useState(false)

  // handler
  const handleOpenEditor = () => {
    if (isOpen) setEditorHeight('auto')
    else setEditorHeight(originalHeight)
    setOpen(!isOpen)
  }

  // lifecycle
  useEffect(() => {
    const currentHeight = ref.current.clientHeight
    const needToggle = setToggle && currentHeight > maxHeight
    if (typeof isBiggerThanMax !== 'boolean') setBiggerThanMax(needToggle)
    if (needToggle) {
      setEditorHeight(maxHeight)
      if (typeof originalHeight === 'string') setOriginalHeight(currentHeight)
    }
  })

  // rendering
  const titleLabel = !mandatory ? (
    <div className={styles.label}>{label}</div>
  ) : (
    <div className={styles.label}>
      {label}
      <div style={{ color: colors.orange, marginLeft: 3 }}>*</div>
    </div>
  )

  return (
    <div className={`form-group ${styles.root}`}>
      {label && titleLabel}
      <div
        ref={ref}
        className={styles.container}
        style={{ ...style, maxHeight: !isOpen && editorHeight }}
        h="12"
        data-tut="reactour__snippet_snippet_toggle"
      >
        <Editor
          rows={rows}
          value={value}
          className={styles.editor}
          disabled={disabled}
          placeholder={placeholder}
          onValueChange={x => onChange({ target: { name, value: x } })}
          highlight={code => highlight(code, getLanguage(ext))}
          style={rem(textareaStyle)}
          padding={10}
        />
        {setToggle && isBiggerThanMax && (
          <IconButton
            icon="arrows-alt"
            className={styles.toggleButton}
            iconClassName={styles.toggleButtonIcon}
            onClick={handleOpenEditor}
          />
        )}
        {setToggle && isOpen && (
          <div className={styles.bottom}>
            <IconButton
              icon={isOpen ? 'angle-double-up' : 'angle-double-down'}
              className={styles.toggleButtonBottom}
              iconClassName={styles.toggleButtonIcon}
              onClick={handleOpenEditor}
            />
          </div>
        )}
        <span className={styles.error}>{error}</span>
      </div>
    </div>
  )
}

SnippetEditor.propTypes = {
  ext: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.shape({}),
  textareaStyle: PropTypes.shape({}),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

SnippetEditor.defaultProps = {
  ext: 'Text',
  name: '',
  label: '',
  value: '',
  error: '',
  rows: 3,
  onChange: () => {},
  placeholder: '',
  mandatory: false,
  disabled: false,
  style: {},
  textareaStyle: {},
  maxHeight: 'auto',
}

export default SnippetEditor
