import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import PasswordGenerator from '@/components/PasswordGenerator.vue'
import { mountWithVuetify } from '@/test/mountWithVuetify'

function mountPage() {
  return mountWithVuetify(PasswordGenerator)
}

const passwordsOf = (wrapper: ReturnType<typeof mountPage>) =>
  wrapper.findAll('[data-testid="password"]').map((el) => el.text())

const generateButton = (wrapper: ReturnType<typeof mountPage>) =>
  wrapper.findAll('button').find((b) => b.text().includes('Generate'))!

afterEach(() => {
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

describe('PasswordGenerator', () => {
  it('shows three 16-character passwords on load', () => {
    const wrapper = mountPage()
    const passwords = passwordsOf(wrapper)

    expect(passwords).toHaveLength(3)
    for (const password of passwords) expect(password).toHaveLength(16)
    expect(wrapper.text()).toContain('Your passwords')
  })

  it('shows the strength of the current settings', () => {
    const wrapper = mountPage()

    expect(wrapper.find('[data-testid="strength-label"]').text()).toBe('Very strong')
    expect(wrapper.text()).toContain('92 bits')
  })

  it('makes new passwords when Generate is clicked', async () => {
    const wrapper = mountPage()
    const before = passwordsOf(wrapper)

    await generateButton(wrapper).trigger('click')

    expect(passwordsOf(wrapper)).not.toEqual(before)
  })

  it('makes new passwords when a setting changes', async () => {
    const wrapper = mountPage()
    const before = passwordsOf(wrapper)

    // Turn on symbols (4th switch).
    await wrapper.findAll('.v-switch input')[3]!.setValue(true)

    const after = passwordsOf(wrapper)
    expect(after).not.toEqual(before)
    for (const password of after) expect(password).toMatch(/[^A-Za-z0-9]/)
  })

  it('copies a password and shows a confirmation', async () => {
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    const wrapper = mountPage()
    const [first] = passwordsOf(wrapper)

    await wrapper.find('[aria-label="Copy password"]').trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledWith(first)
    // The snackbar is teleported outside the component, so look in the whole document.
    expect(document.body.textContent).toContain('Password copied')
  })

  it('shows an error when copying fails', async () => {
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    const wrapper = mountPage()

    await wrapper.find('[aria-label="Copy password"]').trigger('click')
    await flushPromises()

    expect(document.body.textContent).toContain("Couldn't copy")
    expect(document.body.textContent).not.toContain('Password copied')
  })
})
