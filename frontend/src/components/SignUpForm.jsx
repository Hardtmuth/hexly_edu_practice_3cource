import { TextInput, PasswordInput, Button, MaskInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useForm, isNotEmpty, hasLength, isEmail, matchesField } from '@mantine/form'

export const SignUpForm = () => {
  const { t } = useTranslation()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },

    validate: {
      username: (value) => {
        const emptyCheck = isNotEmpty(t('mainpage.signform.errors.usernameEmpty'))(value)
        const lengthCheck = hasLength({ min: 3, max: 20 }, t('mainpage.signform.errors.usernameLength'))(value)
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      email: isEmail(t('mainpage.signform.errors.email')),
      phone: (value) => {
        const emptyCheck = isNotEmpty(t('mainpage.signform.errors.phoneEmpty'))(value)
        const lengthCheck = hasLength(10, t('mainpage.signform.errors.phoneLength'))(value)
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      password: (value) => {
        const emptyCheck = isNotEmpty(t('mainpage.signform.errors.passwordEmpty'))(value)
        const lengthCheck = hasLength({ min: 6, max: 20 }, t('mainpage.signform.errors.passwordLength'))(value)
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      passwordConfirmation: matchesField(
        'password',
        t('mainpage.signform.errors.passwordConfirm')
      ),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        mt="lg"
        placeholder={t('mainpage.signform.username')}
        key={form.key('username')}
        {...form.getInputProps('username')}
      />
      <TextInput
        mt="lg"
        placeholder={t('mainpage.signform.email')}
        rightSection={<IconAt size={16} />}
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <MaskInput
        mt="lg"
        mask="+7 (999) 999-99-99"
        placeholder={t('mainpage.signform.phone')}
        /* key={form.key('phone')}  -- !!! need to fix */
        /* defaultValue={form.getValues().phone} */
        onChangeRaw={(raw) => form.setFieldValue('phone', raw)}
        /* {...form.getInputProps('phone')} */
      />
      <PasswordInput
        mt="lg"
        placeholder={t('mainpage.signform.password')}
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        mt="lg"
        placeholder={t('mainpage.signform.passwordConfirm')}
        key={form.key('passwordConfirmation')}
        {...form.getInputProps('passwordConfirmation')}
      />
      <Button mt="md" fullWidth type="submit">
        {t('mainpage.signform.signupBtn')}
      </Button>
    </form>
  )
}
