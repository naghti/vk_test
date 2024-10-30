import "@testing-library/jest-dom/vitest"

// setupTests.ts
beforeAll(() => {

  // Полифил для matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vitest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vitest.fn(), 
      removeListener: vitest.fn(),
      addEventListener: vitest.fn(),
      removeEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
    })),
  });});
