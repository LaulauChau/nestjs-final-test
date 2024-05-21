## Usage

1. Lancer [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Installer les dépendances
```bash
npm ci
```

3. Lancer les tests
```bash
npm run test:e2e:postgres
```

(Optionnel) Lancer l'application
```bash
npm run start:postgres
```

(Optionnel) Stopper l'application et les containers
```bash
npm run stop:postgres
```
