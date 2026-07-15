import { defineConfig } from '@playwright/test';

// Path is relative to this config file's directory (Playwright's default
// webServer cwd), i.e. `<repo>/argos` → `<repo>/packages/...`.
const STORYBOOK_STATIC = '../packages/storybook-one/storybook-static';

export default defineConfig({
	testDir: '.',
	testMatch: 'stories.spec.ts',
	timeout: 60_000,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 4 : 6,
	fullyParallel: true,
	reporter:
		process.env.ARGOS_TOKEN || process.env.CI
			? [['list'], ['@argos-ci/playwright/reporter']]
			: 'list',
	use: {
		baseURL: 'http://127.0.0.1:6006',
		contextOptions: { reducedMotion: 'reduce' },
	},
	webServer: {
		command: `npx http-server ${STORYBOOK_STATIC} --port 6006 --silent`,
		url: 'http://127.0.0.1:6006/iframe.html',
		reuseExistingServer: true,
		timeout: 30_000,
	},
});
