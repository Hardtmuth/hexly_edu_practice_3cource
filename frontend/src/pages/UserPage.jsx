import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AuthHeader } from '../components/AuthHeader.jsx'
import { Navbar } from '../components/NavBar.jsx'
import { LeadGrid } from '../components/LeadGrid.jsx'

import { useSelector } from 'react-redux'

export const UserPage = () => {
  const [opened] = useDisclosure()
  const user = useSelector((state) => state.auth.user)
  console.log(user)

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
        <h1>User Page</h1>
        <p>Hello {user.name}</p>
        <LeadGrid />
      </AppShell.Main>

    </AppShell>
  )
}
