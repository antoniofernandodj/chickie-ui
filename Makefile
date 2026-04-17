install-proto:
	npm install --save-dev protobufjs-cli

export-proto:
	cp /home/antonio/Development/TS/chickie-ui/src/app/proto/chickie.proto /home/antonio/Development/rust/chickie/proto/chickie.proto

generate-proto:
	npx pbjs -t static-module --keep-case -o src/app/proto/generated.js src/app/proto/chickie.proto
	npx pbts -o src/app/proto/generated.d.ts src/app/proto/generated.js
