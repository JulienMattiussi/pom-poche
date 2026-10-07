default: help

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install all dependencies
	npm install

start: ## Start application in development (http://localhost:9096)
	npm run dev

build: ## Build application for production
	npm run build

preview: build ## Preview production build locally
	npm run preview

lint: ## Run ESLint
	npm run lint

knip: ## Find unused files, exports and dependencies
	npm run knip

format: ## Format code with Prettier
	npm run format

format-check: ## Check formatting with Prettier
	npm run format:check

typecheck: ## Run TypeScript type checker
	npm run typecheck

test: ## Run unit and component tests
	npm run test

test-watch: ## Run tests in watch mode
	npm run test:watch

test-coverage: ## Run tests with coverage report
	npm run test:coverage

CHROME ?= $(shell command -v google-chrome || command -v chromium || command -v chromium-browser)

.PHONY: favicon
favicon: ## Re-render public/favicon.png and public/apple-touch-icon.png from scripts/favicon-template.html (needs Chrome)
	@test -n "$(CHROME)" || { echo "Chrome introuvable. Passe le binaire : make favicon CHROME=/chemin/vers/chrome"; exit 1; }
	@"$(CHROME)" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
		--default-background-color=00000000 --virtual-time-budget=2000 \
		--window-size=192,192 --screenshot=public/favicon.png "file://$(CURDIR)/scripts/favicon-template.html" 2>/dev/null
	@"$(CHROME)" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
		--virtual-time-budget=2000 \
		--window-size=180,180 --screenshot=public/apple-touch-icon.png "file://$(CURDIR)/scripts/favicon-template.html#opaque" 2>/dev/null
	@echo "public/favicon.png (192x192) et public/apple-touch-icon.png (180x180) regeneres"

pouches: ## Re-cut every mockup of pouches/src/ into public/pouches/ (needs Python + Pillow, ImageMagick)
	@python3 scripts/cutout-pouches.py

fix: format lint ## Format and lint all code

check: build lint typecheck knip test ## Run all checks (build, lint, typecheck, knip, tests)
	@echo "All checks passed!"

clean: ## Remove build artifacts and dependencies
	rm -rf dist node_modules coverage
