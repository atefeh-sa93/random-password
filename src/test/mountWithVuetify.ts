import { mount, type ComponentMountingOptions } from '@vue/test-utils'
import type { Component } from 'vue'
import { createVuetify } from 'vuetify'

/**
 * Mounts a component with a fresh Vuetify instance installed, the same way main.ts does.
 * Components are auto-imported by vite-plugin-vuetify, which also runs in Vitest.
 *
 * `<T extends Component>` keeps the component's own type, so props passed in `options`
 * are checked against that component's props.
 */
export function mountWithVuetify<T extends Component>(
  component: T,
  options: ComponentMountingOptions<T> = {},
) {
  return mount(component, {
    ...options,
    attachTo: document.body,
    global: {
      ...options.global,
      plugins: [...(options.global?.plugins ?? []), createVuetify()],
    },
  })
}
