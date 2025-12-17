import adapter from '@sveltejs/adapter-vercel';
// import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    scss: {
      renderSync: true,
      includePaths: ["./src"],
    },
  }),
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
  },
  onwarn: (warning, handler) => {
    const { code, frame } = warning;
    // console.log(code); // <= uncomment to check other warnings
    if (code === "css_unused_selector")
      return;
    if (code === "a11y_invalid_attribute")
      return;
    handler(warning);
  }
};

export default config;
