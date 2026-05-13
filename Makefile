start-frontend:
	npx vite

start-backend:
	node backend/server.js

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .