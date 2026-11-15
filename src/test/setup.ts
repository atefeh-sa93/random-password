// jsdom doesn't implement ResizeObserver, which several Vuetify components use.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver

// jsdom has no visualViewport; Vuetify overlays (like the snackbar) read it to position
// themselves. A stub matching the window size is enough for tests.
if (!('visualViewport' in globalThis)) {
  Object.defineProperty(globalThis, 'visualViewport', {
    value: {
      width: window.innerWidth,
      height: window.innerHeight,
      offsetLeft: 0,
      offsetTop: 0,
      pageLeft: 0,
      pageTop: 0,
      scale: 1,
      addEventListener() {},
      removeEventListener() {},
    },
    configurable: true,
  })
}

// jsdom has no clipboard either. Tests replace writeText with vi.spyOn as needed.
if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: async () => {} },
    configurable: true,
  })
}
