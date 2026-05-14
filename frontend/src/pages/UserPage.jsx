import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AuthHeader } from '../components/AuthHeader.jsx'
import { Navbar } from '../components/NavBar.jsx'
import { LeadGrid } from '../components/LeadGrid.jsx'

export const UserPage = () => {
  const [opened] = useDisclosure()
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
        <LeadGrid />
      </AppShell.Main>

    </AppShell>
  )
}
