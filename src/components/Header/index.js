import React from 'react'

// Components
import Logo from '../Logo'

import styles from './styles.module.scss'

function Header() {
  return (
    <div className={styles.Header}>
      <Logo />
    </div>
  )
}

export default Header
