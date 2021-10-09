import PropTypes from 'prop-types'

import styles from './styles.module.scss'

function Content(props) {
  const { children } = props

  return <div className={styles.Content}>{children}</div>
}

Content.propTypes = {
  children: PropTypes.any,
}
Content.defaultProps = {
  children: null,
}

export default Content
