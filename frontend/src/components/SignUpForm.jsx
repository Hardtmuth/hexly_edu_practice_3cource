import { TextInput, PasswordInput, Button, MaskInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useForm, isNotEmpty, hasLength, isEmail, matchesField } from '@mantine/form'

export const SignUpForm = () => {
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
        const emptyCheck = isNotEmpty('Имя пользователя не может быть пустым')(value)
        const lengthCheck = hasLength({ min: 3, max: 20 }, 'Имя пользователя должно быть от 3 до 20 символов')(value)
        
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      email: isEmail('Некорректный email'),
      phone: (value) => {
        const emptyCheck = isNotEmpty('Телефон не может быть пустым')(value)
        const lengthCheck = hasLength(10, 'Недостаточно символов')(value)
        
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      password: (value) => {
        const emptyCheck = isNotEmpty('Пароль не может быть пустым')(value)
        const lengthCheck = hasLength({ min: 6, max: 20 }, 'Пароль должен быть от 6 до 20 символов')(value)
        
        if (emptyCheck) return emptyCheck
        if (lengthCheck) return lengthCheck
        return null
      },
      passwordConfirmation: matchesField(
        'password',
        'Подтерждение пароля не совпадает с введенным паролем'
      ),
    },
  })

  const { t } = useTranslation()

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
