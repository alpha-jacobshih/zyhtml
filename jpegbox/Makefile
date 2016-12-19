
.PHONY: all clean release
PYJECTS:=pyjects
HAMU_DIR:=hamu
HAMU_PY:=./$(PYJECTS)/$(HAMU_DIR)/hamu.py
RELEASE:=release
SOURCE:=jpegbox.html
OUTPUT:=$(RELEASE)/jpegbox.html

define hamu
    @if [ ! -f $(HAMU_PY) ]; then\
    mkdir -p $(PYJECTS);\
    cd pyjects;\
    git init;\
    git remote add -f origin http://github.com/alpha-jacobshih/pyjects;\
    git config core.sparseCheckout true;\
    echo "hamu/*" > .git/info/sparse-checkout;\
    git checkout master;\
    fi
endef

all: $(HAMU_PY) release

$(HAMU_PY):
	$(call hamu)

release:
	@if [ ! -d $(RELEASE) ]; then mkdir -p $(RELEASE); fi
	@$(HAMU_PY) merge --source $(SOURCE) --output $(OUTPUT)
	@ls -l $(OUTPUT)

clean:
	rm -f $(OUTPUT)
	rm -rf $(RELEASE)
