

all:	get-origin

get-origin:	bounds tiles
	(cd bounds && $(MAKE) get-origin)
	(cd tiles  && $(MAKE) get-origin)

clean:	bounds tiles
	(cd bounds && $(MAKE) clean)
	(cd tiles  && $(MAKE) clean)
