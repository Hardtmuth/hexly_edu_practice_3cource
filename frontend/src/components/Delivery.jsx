import { Container, Title, Text, TextInput,Input, Textarea, Group, SimpleGrid, Checkbox, Anchor, Button, MaskInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'

import { addAddress, toggleDelivery } from '../slices/deliverySlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

export const Delivery = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { terms: false, rules: false },
    validate: {
      street: isNotEmpty(t('deliverypage.form.errors.street')),
      house: isNotEmpty(t('deliverypage.form.errors.house')),
      phone: isNotEmpty(t('deliverypage.form.errors.phone')),
      terms: isNotEmpty(t('deliverypage.form.errors.terms')),
      rules: isNotEmpty(t('deliverypage.form.errors.rules')),
    },
  })

  const handleSubmit = (values) => {
    const { street, house, entrance, apartments, phone, description } = values
    const address = `${street} ${house}${entrance ? `, подъезд ${entrance}` : ''}${apartments ? `, кв. ${apartments}` : ''}`
    console.log(address)

    dispatch(addAddress(address))
    dispatch(toggleDelivery())
    navigate('/cart')
  }

  return (
    <Container>
      <SimpleGrid cols={2}>
        <div>
          <Title order={3}>{t('deliverypage.title')}</Title>
          <Text c="dimmed">{t('deliverypage.text')}</Text>
          <TextInput
            label={t('deliverypage.form.labels.street')}
            withAsterisk
            mt='lg'
            placeholder={t('deliverypage.form.placeholders.street')}
            key={form.key('street')}
            {...form.getInputProps('street')}
          />
          <Group>
            <TextInput
              label={t('deliverypage.form.labels.house')}
              withAsterisk
              mt='lg'
              placeholder={t('deliverypage.form.placeholders.house')}
              key={form.key('house')}
              {...form.getInputProps('house')}
              type="number"
              w={140}
            />
            <TextInput
              label={t('deliverypage.form.labels.entrance')}
              mt='lg'
              placeholder={t('deliverypage.form.placeholders.entrance')}
              key={form.key('entrance')}
              {...form.getInputProps('entrance')}
              type="number"
              w={140}
            />
            <TextInput
              label={t('deliverypage.form.labels.apartments')}
              mt='lg'
              placeholder={t('deliverypage.form.placeholders.apartments')}
              key={form.key('apartments')}
              {...form.getInputProps('apartments')}
              type="number"
              w={140}
            />
          </Group>
          <MaskInput
            mt="lg"
            label={t('deliverypage.form.labels.phone')}
            mask="+7 (999) 999-99-99"
            placeholder={t('deliverypage.form.placeholders.phone')}
            withAsterisk
            /* key={form.key('phone')}
            {...form.getInputProps('phone')} */
            onChangeRaw={(raw) => form.setFieldValue('phone', raw)}
          />
          <Textarea mt='lg'
            label={t('deliverypage.form.labels.description')}
            placeholder={t('deliverypage.form.placeholders.description')}
            autosize
            minRows={5}
            key={form.key('description')}
            {...form.getInputProps('description')}
          />
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Checkbox
              mt='lg'
              label={
                <>
                 {t('deliverypage.form.labels.terms')}{' '}
                  <Anchor href="/agreement" target="_blank" inherit>
                    {t('deliverypage.form.labels.termsLink')}
                  </Anchor>
                </>
              }
              key={form.key('terms')}
              {...form.getInputProps('terms', { type: 'checkbox' })}
            />
            <Checkbox
              mt='lg'
              label={
                <>
                  {t('deliverypage.form.labels.rules')}{' '}
                  <Anchor href="/agreement" target="_blank" inherit>
                    {t('deliverypage.form.labels.rulesLink')}
                  </Anchor>
                </>
              }
              key={form.key('rules')}
              {...form.getInputProps('rules', { type: 'checkbox' })}
            />

            <Button type="submit" mt="md"
              disabled={!form.isValid()}
            >
              {t('deliverypage.form.labels.btn')}
            </Button>
          </form>
        </div>
      </SimpleGrid>
    </Container>
  )
}
