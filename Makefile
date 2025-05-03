.PHONY: up down build start stop restart logs clean

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# Build all services
build:
	docker-compose build

# Start all services
start:
	docker-compose start

# Stop all services
stop:
	docker-compose stop

# Restart all services
restart:
	docker-compose restart

# View logs for all services
logs:
	docker-compose logs -f

# Clean up all containers, networks, and volumes
clean:
	docker-compose down -v --rmi all

# View status of all services
status:
	docker-compose ps

# View logs for a specific service
# Usage: make service-logs SERVICE=db
service-logs:
	docker-compose logs -f $(SERVICE)

# Execute a command in a service
# Usage: make exec SERVICE=db COMMAND="psql -U postgres"
exec:
	docker-compose exec $(SERVICE) $(COMMAND) 