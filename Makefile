make:
	python img.py download
	python img.py resize 384
	npm run deploy
