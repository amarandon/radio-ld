test:
	./node_modules/.bin/testem

install:
	mkdir -p data lib
	wget -O data/fmr.html http://radio-fmr.net/programmes-emissions/
	wget -O lib/d3.v3.js http://d3js.org/d3.v3.js
	cabal sandbox init
	cabal install --dependencies-only
	cabal run
	npm install


serve:
	python -m SimpleHTTPServer
