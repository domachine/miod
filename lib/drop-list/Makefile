
build: components template.js drop-list.js
	@component build --dev

components: component.json
	@component install --dev

template.js: template.html
	@component convert $<

test: build
	@node ../../node_modules/.bin/mocha --reporter spec test/index.js
	@node test/server.js

clean:
	rm -rf build components

.PHONY: test clean
