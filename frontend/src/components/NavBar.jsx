import { useState } from 'react'
import { IconUserCircle, IconHistory, IconLogout, IconTruckDelivery, IconRosetteDiscount, IconHelp} from '@tabler/icons-react'
import { Code, Group } from '@mantine/core'
import { useNavigate } from 'react-router'
import classes from '../../assets/styles/Navbar.module.css'

const data = [
  { link: '', label: 'Профиль', icon: IconUserCircle },
  { link: '', label: 'История заказов', icon: IconHistory },
  { link: '', label: 'Аареса доставки', icon: IconTruckDelivery },
  { link: '', label: 'Скидки и Акции', icon: IconRosetteDiscount },
  { link: '', label: 'Помощь', icon: IconHelp },
]

export const Navbar = () => {
  const [active, setActive] = useState('Billing')
  const navigate = useNavigate()
  const links = data.map(item => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={() => navigate('/')}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Выход</span>
        </a>
      </div>
    </nav>
  )
}
