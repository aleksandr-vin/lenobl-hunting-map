

SERVER = http://old.lenobl.ru/map/bounds/

WGET = wget

all:	get-origin

get-origin:
	rm -f index.html
	$(WGET) ${SERVER}
	${WGET} --recursive --input-file=index.html --base=${SERVER} \
		--relative --no-directories --timestamping --force-html \
		--follow-tags=A

clean:
	find . -type f -not -name "Makefile*" -exec rm {} ";"
