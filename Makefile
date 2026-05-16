DOCKER_DIR = ./backend/docker/

start-db:
	cd "${DOCKER_DIR}" && \
	sudo docker compose up -d

stop-db:
	cd "${DOCKER_DIR}" && \
	sudo docker compose down

remove-db-data:
	cd "${DOCKER_DIR}" && \
	sudo rm -rf data/

start-frontend:
	npx vite

start-backend:
	node backend/server.js

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .