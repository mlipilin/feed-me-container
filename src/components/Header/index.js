import { Link } from 'react-router-dom'

// Components
import Logo from '../Logo'

import styles from './styles.module.scss'

function Header() {
  return (
    <div className={styles.Header}>
      <Link to="/" className={styles.Header__LogoLink}>
        <Logo />
      </Link>
    </div>
  )
}

export default Header
