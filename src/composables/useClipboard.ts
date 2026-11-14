import { ref } from 'vue'

interface CopyFeedback {
  show: boolean
  text: string
  color: 'success' | 'error'
}

/** Copies text to the clipboard and exposes feedback state for a snackbar. */
export function useClipboard() {
  const feedback = ref<CopyFeedback>({ show: false, text: '', color: 'success' })

  async function copy(text: string) {
    try {
      // writeText returns a Promise that rejects when the browser blocks clipboard
      // access (page not focused, no permission, or not served over https).
      await navigator.clipboard.writeText(text)
      feedback.value = { show: true, text: 'Password copied', color: 'success' }
    } catch {
      feedback.value = {
        show: true,
        text: "Couldn't copy. Select the password and copy it manually.",
        color: 'error',
      }
    }
  }

  return { feedback, copy }
}
