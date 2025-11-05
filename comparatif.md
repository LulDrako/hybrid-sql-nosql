# Analyse comparative SQL vs NoSQL

## Ce que j'ai appris

### PostgreSQL (SQL)
Les données sont structurées et rigides. Chaque utilisateur et livre a exactement les mêmes champs. Impossible d'ajouter des champs sans modifier la structure de la table.

**Avantage** : Les données sont cohérentes et fiables.

### MongoDB (NoSQL)
Les profils peuvent avoir des champs différents. Un utilisateur peut avoir 10 genres préférés, un autre aucun. On peut facilement ajouter de nouveaux champs sans casser l'existant.

**Avantage** : Très flexible, facile d'ajouter des fonctionnalités.

## Difficultés rencontrées

1. **Gérer deux connexions différentes**
   - Syntaxe différente entre SQL (`SELECT * FROM`) et MongoDB (`findOne()`)
   - Deux fichiers de config à gérer

2. **Lier les deux bases**
   - Le `userId` dans MongoDB fait référence à l'`id` dans PostgreSQL
   - Pas de vérification automatique, il faut la coder manuellement

3. **Gestion des erreurs**
   - PostgreSQL et MongoDB retournent des erreurs différentes
   - Il faut gérer les deux cas dans le code

## Avantages du modèle hybride

### Séparation claire
- **SQL** = Données importantes (users, books)
- **MongoDB** = Données personnalisables (profils, préférences)

### Flexibilité
On peut modifier les profils MongoDB sans toucher à la base SQL. Par exemple, ajouter un champ "objectifs de lecture" sans migration SQL.

### Performance
- PostgreSQL pour les requêtes complexes avec relations
- MongoDB pour les gros documents et les lectures rapides

## Cas d'usage

| Besoin | Base | Pourquoi |
|--------|------|----------|
| Créer un compte | PostgreSQL | Données critiques |
| Gérer les livres | PostgreSQL | Stock et disponibilité |
| Historique lecture | MongoDB | Volume et évolution |
| Préférences | MongoDB | Personnalisable |

## Schéma d'architecture

```
      Client (Postman)
            |
      Express API
            |
    ┌───────┴───────┐
    |               |
PostgreSQL      MongoDB
 (SQL)         (NoSQL)
    |               |
  users         profiles
  books
```

## Comparaison observée

### Latence
- SQL : ~5-10ms
- NoSQL : ~3-8ms
- Route mixte : ~15ms

### Mise à jour
- **SQL** : Il faut modifier la structure avec `ALTER TABLE`
- **NoSQL** : On ajoute directement de nouveaux champs

### Requêtes
- **SQL** : Très bon pour les JOIN et relations
- **NoSQL** : Très bon pour les documents imbriqués

## Conclusion

Le modèle hybride permet de :
- Garder la rigueur SQL pour les données importantes
- Avoir la flexibilité NoSQL pour les données personnalisées
- Optimiser selon les besoins

C'est utile quand on a des données structurées (users, books) ET des données qui évoluent souvent (profils, préférences).
