import { IconBrandVk, IconBrandGithubFilled, IconBrandTelegram, IconPhone, IconCakeRoll, IconClock } from '@tabler/icons-react'
import { ActionIcon, Container, Group, Text, Anchor } from '@mantine/core'
import { MantineLogo } from '@mantinex/mantine-logo'
import { useNavigate } from 'react-router'
import classes from '../../assets/styles/Footer.module.css'

import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const data = [
    {
      title: t('mainpage.footer.leftSection.title'),
      links: [
        { label: t('mainpage.footer.leftSection.delivery'), link: '/delivery' },
        { label: t('mainpage.footer.leftSection.addresses'), link: '/addresses' },
        { label: t('mainpage.footer.leftSection.agreement'), link: '/agreement' },
        { label: 'Правила доставки', link: '/agreement' },
      ],
    },
    {
      title: t('mainpage.footer.rightSection.title'),
      links: [
        { label: t('mainpage.footer.rightSection.vacancies'), link: '/vacancies' },
        { label: t('mainpage.footer.rightSection.phone'), link: '#' },
        { label: t('mainpage.footer.rightSection.time'), link: '#' },
        { label: t('mainpage.footer.rightSection.shedule'), link: '#' },
      ],
    },
  ]

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Anchor
        key={index}
        className={classes.link}
        component="a"
        onClick={(event) => {
          event.preventDefault()
          navigate(link.link)
        }}
      >
        {link.label !== t('mainpage.footer.rightSection.phone')
          ? link.label == t('mainpage.footer.rightSection.time')
            ? (
                <>
                  <IconClock stroke={1} size={18} style={{ transform: 'translateY(4px)' }} />
                  {link.label}
                </>
              )
            : link.label
          : (
              <>
                <IconPhone stroke={1} size={18} style={{ transform: 'translateY(4px)' }} />
                {link.label}
              </>
            )}
      </Anchor>
    ))

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Group>
            <IconCakeRoll size={34} />
            <Text size="lg" fs="italic" c="blue">
              {t('mainpage.brand')}
            </Text>
          </Group>

          <Text size="xs" c="dimmed" className={classes.description}>
            {t('mainpage.text')}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          {t('mainpage.footer.disclaimer')}
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" aria-label="Twitter">
            <IconBrandVk size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" aria-label="Youtube">
            <IconBrandTelegram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" aria-label="Instagram">
            <IconBrandGithubFilled size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  )
}
