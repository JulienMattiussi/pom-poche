# pompoche

**Page vitrine parodique**, une seule page, sans réel contenu. Application
**100% front-end**, interface en **français**. Partage la stack et les
conventions de `atre-soundboard`, transposées de React à **Vue**.

Hébergement visé : **Vercel Hobby**. Aucune Function, aucune base, aucun secret.

---

## Stack technique

| Outil | Usage |
|---|---|
| Vue 3 (`<script setup>`) + TypeScript | UI |
| Vite | Build / dev server (port **9096**) |
| Tailwind CSS v4 | Styles (via `@tailwindcss/vite`, pas de config JS) |
| Fontsource | Polices auto-hébergées : Figtree (texte), Pacifico (logo), Permanent Marker (titres), Caveat (manuscrit) |
| Vitest + Testing Library (Vue) | Tests unitaires et composants |
| Prettier | Formatage |
| ESLint (eslint-plugin-vue + @vue/eslint-config-typescript) | Linting |
| Knip | Détection des fichiers / exports / dépendances inutilisés |

Zéro dépendance runtime en dehors de Vue et des polices Fontsource.

---

## Arborescence

```
public/
├── favicon.png               # Logo bouteille, fond transparent (généré, versionné)
├── apple-touch-icon.png      # Idem sur fond vert, iOS refuse la transparence (généré)
└── robots.txt
scripts/
└── favicon-template.html     # Gabarit des icônes, rendu par `make favicon`
src/
├── components/
│   ├── BrandLogo.vue         # Logo SVG : bouteille + lettrage "Pom'Poche"
│   ├── SiteHeader.vue        # Barre blanche flottante, liens de part et d'autre du logo
│   ├── SiteFooter.vue        # Grand logo (retour en haut), colline, mentions
│   ├── HeroSection.vue       # Plein écran : vidéo YouTube de fond, accroche h1, poche
│   ├── IconicsSection.vue    # Section "Les iconiques"
│   ├── EngagementsSection.vue # Cartes blanches inclinées, disposées en quinconce
│   ├── EngagementBurst.vue   # Grappes + feuilles qui jaillissent derrière une carte au survol
│   ├── VineLeaf.vue          # Feuille de vigne SVG
│   ├── AboutSection.vue      # « Qui sommes-nous » : titre, vidéo, 2026, polaroïds
│   ├── YearHighlight.vue     # « 2026 » géant, poche posée sur le 3e chiffre
│   ├── CommunitySection.vue  # « Complètement Pom'Poche » : réseaux + défilé de posts
│   ├── CommunityPost.vue     # Une carte du défilé (placeholder ou Short YouTube muet)
│   ├── SocialIcon.vue        # Icônes des réseaux parodiques (Picolagram, TikTrinque, FaceBouteille, BeRond) + YouTube
│   └── PhotoPlaceholder.vue  # Emplacement « Photo à venir » (ou « Vidéo à venir »)
│   ├── ProductCard.vue       # Vignette : poche, grappes, bulle au survol
│   ├── PouchPlaceholder.vue  # Poche SVG en attendant les vraies photos
│   ├── GrapeBunch.vue        # Grappe de raisin SVG, couleur en prop
│   └── WavyRibbon.vue        # Bandeau en vague, texte qui défile avec le scroll
├── community.ts              # Réseaux, posts du défilé, réservoir de Shorts
├── engagements.ts            # Les 3 engagements (titre, couleur, inclinaison, placement)
├── products.ts               # Les 3 produits (bulle, couleur de bandeau, grappes)
├── lib/
│   ├── rotation.ts           # Mélange et répartition des Shorts à chaque visite
│   ├── scroll.ts             # scrollToTop, partagé par l'entête et le pied de page
│   └── youtube.ts            # URL d'embed + messages de l'API iframe YouTube
├── sections.ts               # Liste des sections : alimente la nav et les ancres
├── App.vue                   # La page (scroll vertical : hero + sections)
├── index.css                 # Import Tailwind + thème
├── main.ts                   # Point d'entrée
└── vite-env.d.ts
tests/
├── setup.ts                  # jest-dom pour Vitest
├── unit/                     # Vitest - logique pure (src/lib/)
└── component/                # Vitest + Testing Library
```

---

## Référencement

- **Les crawlers refusent les URL relatives** pour `og:image`. `index.html` porte
  donc des jetons `%SITE_URL%` résolus au build par le plugin `inject-site-url`
  de `vite.config.ts`. Il lit `SITE_URL`, sinon `VERCEL_PROJECT_PRODUCTION_URL`,
  sinon retombe sur l'URL de production. Ne pas écrire d'URL absolue en dur dans
  `index.html`.

### Ordre de la page et ancres

Entête fixe, puis : hero plein écran (vidéo YouTube de fond, porte le `h1`), bandeau
`#produits`, « Les iconiques », bandeau
`#engagements`, section engagements, bandeau `#qui-sommes-nous`, « Qui
sommes-nous », bandeau `#communaute`, « Communauté », pied de page. Chaque section s'ouvre
sur un bandeau, qui porte l'ancre du menu. Les fonds s'enchaînent en dégradés (lime, crème,
lime, bleu ciel du pied de page) : changer une couleur de fond implique de
vérifier les jonctions voisines. Les liens
« Produits » et « Engagements » visent **les bandeaux**, pas les sections.

- **L'entête est `position: fixed`** avec `pointer-events: none` sur la bande
  transparente (seule la barre blanche capte les clics), sinon elle bloquerait
  le contenu qui défile dessous.
- **`scroll-padding-top: 11rem`** sur `html` : une ancre atterrit sous l'entête
  (barre + débord du logo). À ajuster si la hauteur de l'entête change.
- Le logo de l'entête, le grand logo du pied de page et sa flèche ramènent en
  haut via `scrollToTop` (`src/lib/scroll.ts`), qui efface aussi le fragment de
  l'URL.
- Les classes Tailwind ne doivent **jamais être construites dynamiquement**
  (`text-${color}`) : Tailwind ne les détecte pas. D'où les classes complètes
  dans `engagements.ts`.

### Gerbe au survol des engagements

- Chaque `li.engagement-slot` contient la gerbe (`EngagementBurst`) **puis** la
  carte. La gerbe ne peut pas vivre dans la carte : la carte a un `transform`,
  donc crée un contexte d'empilement, et un enfant en `z-index: -1` y serait
  peint au-dessus de son fond blanc.
- La composition (positions, tailles, rotations) est dans `BURST`
  (`engagements.ts`), en % du slot, centre de l'élément. Au repos, chaque
  élément est rétréci et tiré vers le centre (`--dx`/`--dy`) ; au survol il
  rejoint sa place avec un léger rebond, décalé de 25 ms par élément.
- La section est en `overflow-x: clip` : la gerbe de droite déborde de l'écran.
- En capture headless, forcer
  `--blink-settings=availableHoverTypes=2,primaryHoverType=2` : sinon Chrome
  rapporte `hover: none` et le survol n'est jamais rendu.

### Vidéos YouTube hors défilé

Trois façons d'intégrer, trois URL dans `src/lib/youtube.ts` :

- `backgroundUrl` : fond du hero. Auto, muet, en boucle, **sans contrôles**.
  L'iframe 16:9 est centrée et agrandie pour couvrir tout le hero
  (`.hero__frame`), un voile dégradé (`.hero__video::after`) garde l'accroche
  lisible, et elle ne capte aucun clic. `HERO_VIDEO_START` (12 s) saute
  l'intro « Subscribe / Like / Comment / Share » de la vidéo.
- `playerUrl` : vidéo sous « Pionniers depuis 2026 » et polaroïds. Auto,
  muet, en boucle, **avec contrôles** (on peut remettre le son), chargement
  différé (`loading="lazy"`).
- `embedUrl` : Shorts du défilé, pilotés par l'API (voir plus bas).

YouTube affiche son habillage (titre, boutons) quelques secondes au démarrage
et à chaque boucle : accepté.

### Polaroïds de « Qui sommes-nous »

- Chaque polaroïd porte sa légende manuscrite et sa flèche (`POLAROIDS` dans
  `AboutSection.vue`). `place` choisit la position : `top-left`, `bottom` ou
  `top-right` ; la même flèche SVG est retournée en CSS (`scaleX` / `scaleY`)
  selon la position.
- La légende est sœur de la photo, pas enfant : elle ne tourne pas avec elle.
- Un polaroïd peut porter une vidéo YouTube (`youtube: '<id>'`) : lecture
  auto muette en boucle (`playerUrl`), contrôles conservés pour pouvoir
  remettre le son. L'iframe est en `loading="lazy"` : elle ne se charge (et ne
  démarre) qu'à l'approche de la section. Cadre 4:3. Vérifier d'abord que la vidéo
  autorise l'intégration (`youtube.com/oembed?url=...` répond 401 sinon, et le
  lecteur affiche « Vidéo non disponible »).
- En mobile, l'espace vertical entre photos (13rem) loge les légendes
  `bottom` et `top-right` qui se suivent ; ne pas le réduire.

### Défilé de la communauté

- La liste des posts est rendue **deux fois** à la suite ; l'animation `reel`
  translate la piste de `-50%` (plus une demi-gouttière) puis reboucle, ce qui
  donne un défilement infini sans saut. Les doublons sont en `aria-hidden`.
- Chaque carte oscille doucement autour de son inclinaison (`sway` : ±1,5° et
  ±6px). Durées et décalages varient via `nth-child` pour que les cartes ne
  bougent pas à l'unisson.
- Le survol met le défilé en pause (l'oscillation continue). Avec `prefers-reduced-motion`, plus
  d'animation : la piste devient défilable à la main.
- Les pastilles de réseaux ne sont pas des liens tant qu'aucun compte n'existe.
- **Posts YouTube** (`youtube: '<id>'` dans `POSTS`) : miniature
  `i.ytimg.com/vi/<id>/hqdefault.jpg` (la seule qui existe pour tous les
  Shorts ; 4:3 avec bandes noires, le recadrage `object-fit: cover` en 9:16
  tombe pile sur la vidéo).
- **Préchargement** (écrans avec survol uniquement) : un `IntersectionObserver`
  (marge 300px) monte l'iframe `youtube-nocookie.com` (`enablejsapi=1`,
  `mute=1`) dès que la carte approche de l'écran, et la lance **en lecture
  muette, invisible** sous la miniature. Le survol ne fait que la révéler :
  démarrage instantané (mesuré à ~10 ms, contre ~1 s en montant le lecteur au
  survol). Hors écran, le lecteur est mis en pause.
- **Rotation** : les posts YouTube de `POSTS` ne portent pas de vidéo.
  `SHORTS` (`community.ts`) est un réservoir mélangé à chaque chargement
  (`assignVideos`, `src/lib/rotation.ts`) : les premiers vont aux cartes, le
  reste plus `BACKUP_ONLY` (vidéos horizontales, jamais en premier choix)
  sert de secours. Les copies du défilé reçoivent la même liste que leur
  original. Pour ajouter un Short : l'ajouter à `SHORTS`.
- **Vidéos de secours** : chaque carte essaie sa vidéo, puis les secours
  (`withBackups`), dans un ordre décalé selon la position de la carte pour que
  deux cartes en panne ne tombent pas sur le même secours. On passe au suivant sur `onError`
  du lecteur (vidéo supprimée, privée, intégration refusée, bloquée dans le
  pays) ou si la miniature ne charge pas. Tout échoue : « Vidéo à venir ». Le
  test se fait au préchargement, donc avant le survol.
- **L'habillage YouTube au rebouclage est accepté** : chaque fois qu'un Short
  repart du début (boucle gérée à la main par `seekTo` juste avant la fin,
  `loop=1` rechargeant la vidéo), YouTube réaffiche titre, bouton pause et logo
  ~3 s. `controls=0` n'y change rien. Seuls des mp4 auto-hébergés l'éviteraient.
- **Ne pas faire pause / lecture au survol** : YouTube réaffiche alors son
  habillage (titre, bouton pause, logo) pendant quelques secondes. C'est pour
  ça que le lecteur tourne en continu tant qu'il est à l'écran, et qu'au survol
  on tombe en cours de vidéo plutôt qu'au début.
- Le pilotage passe par `postMessage` (`src/lib/youtube.ts`) : on envoie
  `listening` au `load` de l'iframe, puis on reçoit `onReady` et les états de
  lecture ; l'iframe ne devient visible qu'une fois l'état « lecture » reçu.
- Tactile (pas de survol) : pas de préchargement, pour ne pas charger
  plusieurs lecteurs sur mobile ; un tap monte le lecteur et le lance.
- L'iframe est en `pointer-events: none` : le survol reste sur la carte, et
  personne ne peut réactiver le son depuis le lecteur.

### Favicon

Le favicon est un PNG et non un SVG : un SVG utilisé comme image ne charge pas
de police, le lettrage Pacifico tomberait. `scripts/favicon-template.html`
duplique le SVG de `BrandLogo.vue` ; **après un changement du logo, reporter la
modification dans le gabarit puis lancer `make favicon`** (nécessite Chrome).

### Vignettes produits

- **Le survol est 100% CSS** (`.product-card` dans `index.css`) : la poche
  pivote dans l'autre sens, les grappes s'écartent (gauche, bas, droite) et la
  bulle apparaît. Le même état s'active sur `:focus` : la vignette a
  `tabindex="0"`, ce qui le rend accessible au clavier et au tap sur mobile.
- Les grappes sont rognées par `.product-card__fruits` (overflow hidden), pas
  par la carte elle-même, pour que la poche puisse déborder au-dessus.

### Bandeau en vague

- Un seul chemin SVG (`CENTERLINE`, une sinusoïde en Bézier) sert deux fois :
  tracé avec un `stroke` épais, il dessine le bandeau ; en `textPath`, il porte
  le texte. Changer la vague, c'est changer ce chemin et rien d'autre.
- Le défilement est **lié au scroll**, pas animé en continu : page immobile,
  texte immobile. `startOffset` vaut `-(scrollY * SPEED) mod longueurPhrase`.
  La longueur de la phrase est mesurée une fois les polices chargées
  (`document.fonts.ready`), sinon la boucle saute.
- `preserveAspectRatio="xMidYMid slice"` + `min-height` : sur mobile, le SVG est
  rogné sur les côtés au lieu de rapetisser le texte.
- L'amplitude (45) reste inférieure à la demi-épaisseur du bandeau (55) : le
  bandeau couvre toujours la ligne médiane. Garder cette inégalité si un jour
  les fonds au-dessus et au-dessous diffèrent.
- `prefers-reduced-motion` : le texte reste fixe.
- Le premier bandeau porte la classe `hero-ribbon` : marge négative d'une
  demi-hauteur et fond transparent au-dessus de la ligne médiane, pour que la
  vidéo du hero apparaisse au-dessus de la vague.
- Props : `inverted` (phase de la vague), `reverse` (sens du défilement). On
  les alterne d'un bandeau à l'autre pour varier.

---

## Contraintes techniques

- **100% front-end** : aucun appel serveur, pas de backend.
- **Pas de SSR** : Vite SPA. Ne pas introduire Nuxt.
- **Alias `@/`** pointe vers `src/`. Toujours l'utiliser pour les imports
  internes, jamais de chemins relatifs `../../`.
- **Tailwind v4** : `@import 'tailwindcss'` dans le CSS, pas de
  `tailwind.config.js`.
- **TypeScript strict** : `noUnusedLocals`, `noUnusedParameters`,
  `noUncheckedIndexedAccess` activés. Ne pas les désactiver.

---

## Règles de développement

### Structure
- `src/lib/` : logique pure, zéro import Vue.
- `src/components/` : présentation, en SFC `<script setup lang="ts">`.
- **Taille des fichiers** : viser < ~300 lignes ; au-delà, découper.

### Qualité du code
- **Factoriser, ne pas dupliquer** : extraire les helpers réutilisables.
- **Pas de code mort** : `make knip` doit rester vert.
- **Commentaires utiles seulement** : expliquer le pourquoi / le non-évident ;
  ne jamais paraphraser le code. Le pourquoi vit de préférence dans ce fichier.

### Accessibilité
- Tout cliquable est un bouton/lien avec libellé accessible ; focus clavier
  visible ; ne jamais coder l'information par la seule couleur.
- Respecter `prefers-reduced-motion` pour toute animation.

### Qualité (avant de considérer une tâche terminée)
- `make check` doit passer (build + lint + typecheck + knip + tests).

---

## Commandes (Makefile)

| Commande | Effet |
|---|---|
| `make install` | Installe les dépendances |
| `make start` | Serveur de dev (http://localhost:9096) |
| `make build` | Build de production |
| `make favicon` | Régénère `favicon.png` et `apple-touch-icon.png` (nécessite Chrome) |
| `make lint` | ESLint |
| `make knip` | Détecte fichiers / exports / dépendances inutilisés |
| `make format` | Formate avec Prettier |
| `make typecheck` | Vérifie les types |
| `make test` | Tests unitaires et composants |
| `make fix` | Format + lint |
| `make check` | build + lint + typecheck + knip + tests |

---

## Conventions globales du dépôt

- **Code en anglais** : commentaires, identifiants, noms de variables et de
  fonctions. Seules les valeurs affichées à l'utilisateur sont en français.
- **Commits** : pas de trailer `Co-Authored-By`. Vaut aussi pour les
  descriptions de pull request.
- **Typographie** : ne jamais introduire de tiret long (em-dash ou en-dash) dans
  le code, les chaînes, les commentaires ou la doc. Utiliser un tiret ASCII `-`,
  deux-points, parenthèses, ou reformuler.
