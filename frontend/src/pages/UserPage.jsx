import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AuthHeader } from '../components/AuthHeader.jsx'
import { Navbar } from '../components/NavBar.jsx'
import { LeadGrid } from '../components/LeadGrid.jsx'
import { Profile } from '../components/Profile.jsx'
import { OrdersHistory } from '../components/OrdersHistory.jsx'
import { Addresses } from '../components/Addresses.jsx'
import { Discounts } from '../components/Discounts.jsx'
import { Help } from '../components/Help.jsx'


import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'

export const UserPage = () => {
  const [opened] = useDisclosure()
  const user = useSelector((state) => state.auth.user)

  const [searchParams] = useSearchParams()
  const selectParam = searchParams.get('select')

  const paramsMap = {
    profile: <Profile />,
    history: <OrdersHistory />,
    addresses: <Addresses />,
    discounts: <Discounts />,
    help: <Help />,
  }


  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <AuthHeader />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        { paramsMap[selectParam] || <Profile /> }
      </AppShell.Main>

    </AppShell>
  )
}
