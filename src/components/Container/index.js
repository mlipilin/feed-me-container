import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

function Container(props) {
  const { children } = props

  return <div className={styles.Container}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.any,
}
Container.defaultProps = {
  children: null,
}

export default Container
