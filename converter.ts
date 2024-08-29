const json = `{"@sveltejs/adapter-auto": "^3.0.0",
		"@sveltejs/kit": "^2.0.0",
		"@sveltejs/package": "^2.0.0",
		"@sveltejs/vite-plugin-svelte": "^4.0.0-next.6",
		"@types/eslint": "^9.6.0",
		"eslint": "^9.0.0",
		"eslint-config-prettier": "^9.1.0",
		"eslint-plugin-svelte": "^2.36.0",
		"globals": "^15.0.0",
		"prettier": "^3.1.1",
		"prettier-plugin-svelte": "^3.1.2",
		"publint": "^0.1.9",
		"svelte": "5.0.0-next.238",
		"svelte-check": "^3.6.0",
		"typescript": "^5.0.0",
		"typescript-eslint": "^8.0.0",
		"vite": "^5.0.11"}`;

const packages = JSON.parse(json);

let finalString = ``;

Object.entries(packages).forEach(([k, v]) => {
	finalString += `"${k}":"npm:${k}@${v}",\n`;
});
console.log(finalString);
