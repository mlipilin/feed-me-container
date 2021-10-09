import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'

import styles from './styles.module.scss'

const ITEMS = [
  {
    to: '/',
    name: 'Browse Restaurants',
  },
  {
    to: '/surprise',
    name: 'Surprise Me',
  },
  {
    to: '/about',
    name: 'About',
  },
]

function Menu() {
  const location = useLocation()

  return (
    <nav className={styles.Menu}>
      <ul className={styles.Menu__List}>
        {ITEMS.map((item) => (
          <li className={styles.Menu__ListItem} key={item.to}>
            <Link
              className={cn(styles.Menu__ListItemLink, {
                [styles.Menu__ListItemLink_active]:
                  item.to === location.pathname,
              })}
              to={item.to}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
