import { Input, PasswordInput, Button } from '@mantine/core'

export const SignInForm = () => {
  return (
    <>
      <Input.Wrapper
        label="Input label"
        error=""
      >
        <Input placeholder="Input inside Input.Wrapper" />
      </Input.Wrapper>
      <PasswordInput
        label="Input label"
        placeholder="Input placeholder"
      />
      <Button mt="md" fullWidth>Войти</Button>
    </>
  )
}
