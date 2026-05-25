import { useState, useMemo } from 'react'
import { IconUserCircle, IconHistory, IconLogout, IconTruckDelivery, IconRosetteDiscount, IconHelp} from '@tabler/icons-react'
import { Code, Group } from '@mantine/core'
import { useNavigate, Link, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import classes from '../../assets/styles/Navbar.module.css'
import { logout } from '../slices/authSlice.js'


export const Navbar = () => {
  const [active, setActive] = useState('Профиль')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const currentPath = location.pathname
  const searchParams = new URLSearchParams(location.search)
  const currentCategory = searchParams.get('select')

  const data = useMemo(() => [
  { link: '/user', label: 'Профиль', icon: IconUserCircle, select: 'profile' },
  { link: '/user', label: 'История заказов', icon: IconHistory, select: 'history' },
  { link: '/user', label: 'Аареса доставки', icon: IconTruckDelivery, select: 'addresses' },
  { link: '/user', label: 'Скидки и Акции', icon: IconRosetteDiscount, select: 'discounts' },
  { link: '/user', label: 'Помощь', icon: IconHelp, select: 'help' },
  ], [])

  const computedActive = useMemo(() => {
    if (currentPath !== '/user') {
      const directMatchIndex = data.findIndex(link => link.link === currentPath)
      if (directMatchIndex !== -1) {
        return directMatchIndex
      }
    }

    if (currentPath === '/user' && currentCategory) {
      const categoryMatchIndex = data.findIndex(
        link => link.select === currentCategory,
      )
      if (categoryMatchIndex !== -1) {
        return categoryMatchIndex
      }
    }

    return -1
  }, [currentPath, currentCategory, data])

  const links = data.map((item, index) => {
    return (
    <a
      className={classes.link}
      data-active={index === computedActive || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
          event.preventDefault()
          // setActive(index)
          navigate(`/user?select=${item.select}`)
        }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  )})

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Выход</span>
        </a>
      </div>
    </nav>
  )
}
