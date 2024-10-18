# Vue Todo List Project

Ce projet est une petite application de todo list développée avec Vue 3 et Vite. Les utilisateurs peuvent s'inscrire, créer, modifier et supprimer des tâches. Toutes les données sont stockées dans le **Local Storage** du navigateur, ce qui signifie qu'il n'y a pas besoin de base de données externe.

## Fonctionnalités

- Inscription des utilisateurs.
- Ajout, modification et suppression de tâches.
- Sauvegarde des tâches dans le **Local Storage** pour une persistance locale.
- Interface réactive avec Vue 3.

## Configuration recommandée de l'IDE

Utilise [VSCode](https://code.visualstudio.com/) avec l'extension [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (et désactive Vetur).

## Installation du projet

``npm install``

Compilation et rechargement à chaud pour le développement

``npm run dev``

Compilation et minification pour la production

``npm run build``

# Exécution des tests de composants avec Cypress Component Testing

npm run test:unit:dev # ou `npm run test:unit` pour les tests en mode headless

# Exécution des tests end-to-end avec Cypress

npm run test:e2e:dev

Cela exécute les tests end-to-end sur le serveur de développement Vite. C'est bien plus rapide que la version de production.

Cependant, il est recommandé de tester aussi la version de production avec test:e2e avant de déployer (par exemple dans des environnements CI) :


npm run build
npm run test:e2e
Linting avec ESLint

npm run lint

## Détails techniques

Framework : Vue 3
Outil de build : Vite
Stockage des données : Local Storage