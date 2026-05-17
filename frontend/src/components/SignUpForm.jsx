import { Input, PasswordInput, Button, MaskInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const SignUpForm = () => {
  const { t } = useTranslation()
  return (
    <>
      <Input.Wrapper mt="lg" error="">
        <Input placeholder={t('mainpage.signform.username')} />
      </Input.Wrapper>
      <Input mt="lg" placeholder={t('mainpage.signform.email')} rightSection={<IconAt size={16} />} />
      <MaskInput
        mt="lg"
        mask="+7 (999) 999-9999"
        placeholder={t('mainpage.signform.phone')}
      />
      <PasswordInput
        mt="lg"
        placeholder={t('mainpage.signform.password')}
      />
      <PasswordInput
        mt="lg"
        placeholder={t('mainpage.signform.passwordConfirm')}
      />
      <Button mt="md" fullWidth>
        {t('mainpage.signform.signupBtn')}
      </Button>
    </>
  )
}
