# Analyse SQL vs NoSQL

## Complémentarité

### PostgreSQL (SQL)
Structure rigide et cohérente. Les utilisateurs et livres ont tous les mêmes champs. Garantit l'unicité de l'email.

Avantage : Données fiables et cohérentes.

### MongoDB (NoSQL)
Structure flexible. Chaque profil peut avoir des données différentes. L'historique grandit librement.

Avantage : Évolution facile sans migration.

## Difficultés

1. Deux connexions différentes à gérer
2. Syntaxes différentes (SQL vs Mongoose)
3. Lien manuel entre userId MongoDB et id PostgreSQL
4. Gestion d'erreurs différente selon la base

## Avantages du modèle hybride

SQL pour les données critiques (users, books).
NoSQL pour les données flexibles (profils, préférences).

On peut modifier les profils sans toucher à la base SQL.

## Cas d'usage

| Besoin | Base | Raison |
|--------|------|--------|
| Créer compte | PostgreSQL | Cohérence |
| Gérer livres | PostgreSQL | Stock |
| Historique lecture | MongoDB | Volume |
| Préférences | MongoDB | Flexible |

## Schéma

```
Client
  ↓
Express API
  ↓
PostgreSQL + MongoDB
  ↓
users, books + profiles
```

## Performance observée

SQL : 5-10ms
NoSQL : 3-8ms
Mixte : 15ms

## Mise à jour

SQL : ALTER TABLE nécessaire
NoSQL : Ajout direct de champs

## Conclusion

Le modèle hybride combine :
- Rigueur SQL pour données importantes
- Flexibilité NoSQL pour données personnalisées

Utile quand on a des données structurées ET évolutives.

## Perspectives

1. Authentification JWT
2. Cache Redis
3. Tests automatiques
4. Documentation Swagger
5. Docker
6. Monitoring
