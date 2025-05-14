#!/usr/bin/env node

import fs from 'node:fs/promises';

const file = await fs.readFile(`${process.cwd()}/package.json`);

const text = new TextDecoder().decode(file);
const packageJson_obj = JSON.parse(text);

const newPackageJson_obj = {
	...packageJson_obj,
	scripts: {
		dev: packageJson_obj.scripts.dev,
		build: packageJson_obj.scripts.build,
		check: packageJson_obj.scripts.check
	}
};
delete newPackageJson_obj['devDependencies'];

const npmArg = Object.entries(process.env).filter((v) => v[0].startsWith('npm'));
console.log(npmArg);
