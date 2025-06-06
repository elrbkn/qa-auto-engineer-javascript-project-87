setup:
	npm install

test:
	npm test

lint:
	npx eslint .

coverage:
	npx vitest run --coverage
