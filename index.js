import { toArray } from 'lodash'

import React from 'react'
import { Text } from 'react-native'
import { findAll } from 'highlight-words-core'
import PropTypes from 'prop-types'

import { colors } from '../assets'

Highlighter.propTypes = {
  autoEscape: PropTypes.bool,
  highlightStyle: Text.propTypes.style,
  match: PropTypes.object,
  searchWords: PropTypes.arrayOf(PropTypes.string),
  textToHighlight: PropTypes.string.isRequired,
  sanitize: PropTypes.func,
  style: Text.propTypes.style,
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <Text> elements (wrapping highlighted words).
 */
export default function Highlighter({
  autoEscape,
  highlightStyle,
  match,
  searchWords,
  textToHighlight,
  sanitize,
  style,
  ...props
}) {
  if (match && match.indexes) {
    const { indexes } = match

    return (
      <Text style={style} {...props}>
        {toArray(textToHighlight).map((char, index) => {
          if (indexes.indexOf(index) !== -1) {
            return <Text style={{ color: colors.primaryColor }}>{char}</Text>
          } else {
            return <Text>{char}</Text>
          }
        })}
      </Text>
    )
  }

  if (searchWords) {
    const chunks = findAll({
      textToHighlight,
      searchWords,
      sanitize,
      autoEscape,
    })
    return (
      <Text style={style} {...props}>
        {chunks.map((chunk, index) => {
          const text = textToHighlight.substr(
            chunk.start,
            chunk.end - chunk.start
          )

          return !chunk.highlight ? (
            text
          ) : (
            <Text key={index} style={chunk.highlight && highlightStyle}>
              {text}
            </Text>
          )
        })}
      </Text>
    )
  }

  return (
    <Text style={style} {...props}>
      {textToHighlight}
    </Text>
  )
}
