# Calculateur-carbo

Application web pour calculer la pression d'équilibre CO2 et la durée de carbonatation d'une bière.

Les calculs sont basés sur un document Excel partagé sur brassageamateur.com :
- [Discussion](https://www.brassageamateur.com/forum/viewtopic.php?f=56&t=7652&p=84017&hilit=boite+%C3%A0+outils+carbo#p84017)
- [Fichier source](https://www.brassageamateur.com/forum/download/file.php?id=296)

## Utilisation

1. Sélectionnez le type de bière et ajustez la carbonatation désirée.
2. Renseignez la température, le volume, la surface d'échange, la tension initiale et la pression dans le fût.
3. Cliquez sur **Calculer**.

L'application est utilisable en PWA (ajout à l'écran d'accueil depuis le navigateur).

## Installation locale

```sh
git clone https://github.com/Nem0oo/Calculateur-carbo.git
cd Calculateur-carbo
```

Servez ensuite les fichiers du dossier `code/` avec n'importe quel serveur web. Voir [ExempleDocker.md](ExempleDocker.md) pour un exemple avec Docker.

---

**Auteur :** Nem0oo — licence MIT
