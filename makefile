
.PHONY: op2-navigation op2-campaigns op2-user-management

.DEFAULT: usage

usage:
	@echo "Usage: make { ... }" >&2

op2-navigation: %:
	rm -rf static/*.{js,css,map,html}
	cp -r ../$*/dist/* static/

op2-campaigns op2-user-management: %:
	rm -rf static/$*
	mkdir -p static/$*
	cp -r ../$*/dist/* static/$*/

