LAMBDAS=$(shell for l in $$(ls ./lambda | grep -v util);do echo lambda/$$l;done)

lambda: $(LAMBDAS)
	for l in $^; do \
		cd $$l && make ../../build/$$l.zip; \
		cd ../..;	\
	done;			

build/templates/%.json: templates/%
	./bin/build.js $*	

build/templates/dev/%.json: templates/dev/%.json
	./bin/build-simple.js dev/$* > build/templates/dev/$*.json
build/templates/dev/%.json: templates/dev/%.js
	./bin/build-simple.js dev/$* > build/templates/dev/$*.json

build/templates/test/%.json: templates/test/%.json
	./bin/build-simple.js test/$* > build/templates/test/$*.json
build/templates/test/%.json: templates/test/%.js
	./bin/build-simple.js test/$* > build/templates/test/$*.json

template: build/templates/* build/templates/test/* build/templates/dev/* ./templates/util/*

build/codedeploy/proxy.zip: proxy
	./bin/build-codedeploy.sh

build/assets/: assets/*
	cp -r assets build

upload: lambda template build/codedeploy/proxy.zip build/assets
	./bin/upload.sh

.PHONY:lambda build/lambda/%.zip
