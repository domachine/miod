
install:
	@make -C lib/miod components

run: install
	@NODE_PATH=lib node index.js

test:

.PHONY: test
