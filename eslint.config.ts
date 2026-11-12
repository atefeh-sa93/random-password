import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  // `legacy/` holds the old Vue 2 code until it is ported (issues #10 and #11).
  globalIgnores(['**/dist/**', '**/coverage/**', 'legacy/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  skipFormatting,
)
