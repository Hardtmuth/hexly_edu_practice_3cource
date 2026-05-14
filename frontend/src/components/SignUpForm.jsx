import { Input, PasswordInput, Button, MaskInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'

export const SignUpForm = () => {
  return (
    <>
      <Input.Wrapper
        label="Input label"
        error=""
      >
        <Input placeholder="Input inside Input.Wrapper" />
      </Input.Wrapper>
      <Input placeholder="Your email" leftSection={<IconAt size={16} />} />
      <MaskInput
        label="Input label"
        description="Input description"
        mask="(999) 999-9999"
        placeholder="+7(___) ___-____"
      />
      <PasswordInput
        label="Input label"
        placeholder="Input placeholder"
      />
      <PasswordInput
        label="Input label"
        placeholder="Input placeholder"
      />
      <Button mt="md" fullWidth>Зарегистрировться</Button>
    </>
  )
}
