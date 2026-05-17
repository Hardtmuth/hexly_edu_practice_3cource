import { Input, PasswordInput, Button } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const SignInForm = () => {
  const { t } = useTranslation()
  return (
    <>
      <Input.Wrapper mt="md" error="">
        <Input placeholder={t('mainpage.signform.email')} rightSection={<IconAt size={16} />} />
      </Input.Wrapper>
      <PasswordInput mt="md" error="" placeholder={t('mainpage.signform.password')} />
      <Button mt="md" fullWidth>
        {t('mainpage.signform.signinBtn')}
      </Button>
    </>
  )
}
