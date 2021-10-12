import { NavLink } from 'react-router-dom'

import styles from './styles.module.scss'

const ITEMS = [
  {
    to: '/',
    name: 'Browse Restaurants',
  },
  {
    to: '/about',
    name: 'About',
  },
]

function Menu() {
  return (
    <nav className={styles.Menu}>
      <ul className={styles.Menu__List}>
        {ITEMS.map((item) => (
          <li className={styles.Menu__ListItem} key={item.to}>
            <NavLink
              activeClassName={styles.Menu__ListItemLink_active}
              className={styles.Menu__ListItemLink}
              exact
              to={item.to}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
