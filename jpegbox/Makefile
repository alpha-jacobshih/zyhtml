
.PHONY: all clean release
RELEASE:=release
SOURCE:=jpegbox.html
OUTPUT:=$(RELEASE)/jpegbox.html

all: release

release:
	@if [ ! -d $(RELEASE) ]; then mkdir -p $(RELEASE); fi
	@./hmu.py merge --source $(SOURCE) --output $(OUTPUT)
	@ls -l $(OUTPUT)

clean:
	rm -f $(OUTPUT)
	rm -rf $(RELEASE)
