
components: lib/miod/component.json
	@cd lib/miod; component install

run: components
	@NODE_PATH=lib node index.js

test:

.PHONY: test
