import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import OptionsPanel from '@/components/OptionsPanel.vue'
import { mountWithVuetify } from '@/test/mountWithVuetify'
import type { PasswordOptions } from '@/utils/password'

function makeOptions(overrides: Partial<PasswordOptions> = {}): PasswordOptions {
  return {
    length: 16,
    sets: { uppercase: true, lowercase: true, numbers: true, symbols: false },
    excludeSimilar: false,
    excludeAmbiguous: false,
    count: 3,
    ...overrides,
  }
}

/**
 * Mounts OptionsPanel the way a parent with v-model would: pass `modelValue`, and
 * when the component emits `update:modelValue`, feed the new value back in.
 */
function mountPanel(options = makeOptions()) {
  const wrapper = mountWithVuetify(OptionsPanel, {
    props: {
      modelValue: options,
      'onUpdate:modelValue': (value: PasswordOptions) => wrapper.setProps({ modelValue: value }),
    },
  })
  return { wrapper, options }
}

// Switch order in the template: uppercase, lowercase, numbers, symbols, similar, ambiguous.
const switchInputs = (wrapper: ReturnType<typeof mountPanel>['wrapper']) =>
  wrapper.findAll<HTMLInputElement>('.v-switch input')

afterEach(() => {
  document.body.innerHTML = ''
})

describe('OptionsPanel', () => {
  it('toggles a character set in the bound options', async () => {
    const { wrapper, options } = mountPanel()

    await switchInputs(wrapper)[3]!.setValue(true)

    expect(options.sets.symbols).toBe(true)
  })

  it('disables the last enabled character set', async () => {
    const { wrapper } = mountPanel()

    await switchInputs(wrapper)[0]!.setValue(false)
    await switchInputs(wrapper)[1]!.setValue(false)

    const [upper, lower, numbers] = switchInputs(wrapper)
    expect(numbers!.element.disabled).toBe(true)
    expect(upper!.element.disabled).toBe(false)
    expect(lower!.element.disabled).toBe(false)
    expect(wrapper.text()).toContain('At least one character type stays on.')
  })

  it('clamps a typed length when the field loses focus', async () => {
    const { wrapper, options } = mountPanel()
    const field = wrapper.find<HTMLInputElement>('#password-length')

    await field.trigger('focus')
    await field.setValue('1000')
    await field.trigger('blur')
    await flushPromises()

    expect(options.length).toBe(50)
    expect(field.element.value).toBe('50')
  })

  it('applies a typed length on Enter', async () => {
    const { wrapper, options } = mountPanel()
    const field = wrapper.find<HTMLInputElement>('#password-length')

    await field.setValue('24')
    await field.trigger('keydown', { key: 'Enter' })

    expect(options.length).toBe(24)
  })

  it('does not change the length while the user is still typing', async () => {
    const { wrapper, options } = mountPanel()

    await wrapper.find('#password-length').setValue('1')

    expect(options.length).toBe(16)
  })

  it('sets how many passwords to generate', async () => {
    const { wrapper, options } = mountPanel()
    const five = wrapper.findAll('.v-btn-toggle button').find((b) => b.text() === '5')

    await five!.trigger('click')

    expect(options.count).toBe(5)
  })

  it('toggles the exclude options', async () => {
    const { wrapper, options } = mountPanel()

    await switchInputs(wrapper)[4]!.setValue(true)
    await switchInputs(wrapper)[5]!.setValue(true)

    expect(options.excludeSimilar).toBe(true)
    expect(options.excludeAmbiguous).toBe(true)
  })
})
