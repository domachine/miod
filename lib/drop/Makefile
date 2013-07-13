
build: components template.js drop.css
	@component build --dev

test:

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

.PHONY: test
