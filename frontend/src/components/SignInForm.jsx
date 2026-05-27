import { TextInput, PasswordInput, Button, Card, Text } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useForm, isNotEmpty, hasLength, isEmail } from '@mantine/form'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/authSlice.js'

export const SignInForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const handleSubmit = (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        console.log('Успешная авторизация')
        navigate('/user')
      })
      .catch((errorMsg) => {
        console.error('Ошибка:', errorMsg)
      })
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail(t('mainpage.signform.errors.email')),
      password: (value) => {
        const emptyCheck = isNotEmpty(t('mainpage.signform.errors.passwordEmpty'))(value)
        const lengthCheck = hasLength({ min: 6, max: 20 }, (t('mainpage.signform.errors.passwordLength')))(value)
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
      {error
        ? (
            <Card mt="lg" withBorder style={{ background: 'var(--mantine-color-red-6)', color: 'var(--mantine-color-red-0)' }}>
              <Text align="center" fs="italic">{error}</Text>
            </Card>
          )
        : <></>}
      <TextInput
        mt="md"
        placeholder={t('mainpage.signform.email')}
        rightSection={<IconAt size={16} />}
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        mt="md"
        placeholder={t('mainpage.signform.password')}
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <Button
        mt="md"
        fullWidth
        type="submit"
      >
        {t('mainpage.signform.signinBtn')}
      </Button>
    </form>
  )
}
