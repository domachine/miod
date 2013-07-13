
build: components template.js drop-list.js
	@component build --dev

components: component.json
	@component install --dev

template.js: template.html
	@component convert $<

test:

.PHONY: test
