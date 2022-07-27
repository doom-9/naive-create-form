import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ProForm from '../../proForm/index'

describe('suite name', () => {
  test('should work with import on demand', () => {
    mount(ProForm)
  })

  test('should work with title prop', async () => {
    const w = mount(ProForm, {
      props: {
        title: 'test Title',
      },
    })
    expect(w.find('.n-divider').exists()).toBe(true)

    expect(w.find('.n-divider__title').text()).toEqual('test Title')

    await w.setProps({
      title: undefined,
    })

    expect(w.find('.n-divider').exists()).toBe(false)

    w.unmount()
  })
})
