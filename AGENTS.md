# pompoche

**Page vitrine parodique** d'une marque de vin en gourde, PomPoche : une seule
page en scroll vertical, calquée sur le site d'une marque de compotes à boire.
Application **100% front-end**, interface en **français**. Partage la stack et
les conventions de `atre-soundboard`, transposées de React à **Vue**.

Hébergement : **Vercel Hobby**, adresse publique **https://pom-poche.vercel.app**.
Aucune Function, aucune base, aucun secret.

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
| Python + Pillow, ImageMagick | Détourage des poches (hors runtime, `make pouches`) |

Zéro dépendance runtime en dehors de Vue et des polices Fontsource. Les vidéos
sont des intégrations YouTube (`youtube-nocookie.com`).

---

## Arborescence

```
docs/
└── images/                   # Captures du README (non automatisées)
og.html                       # Page de l'image de partage (servie par Vite, hors build)
tools/
├── og.ts                     # Point d'entrée de og.html
└── OgCard.vue                # Image de partage 1200x630, faite des vrais composants
public/
├── community/                # Photos du défilé « Communauté »
├── pouches/                  # Poches détourées, WebP transparents (générés, versionnés)
├── favicon.png               # Logo bouteille, fond transparent (généré, versionné)
├── apple-touch-icon.png      # Idem sur fond vert, iOS refuse la transparence (généré)
├── og.png                    # Image de partage (générée par `make og`, versionnée)
├── site.webmanifest
├── robots.txt
└── sitemap.xml
pouches/
└── src/                      # Maquettes de poches d'origine (JPEG 671x1024), source de vérité
scripts/
├── cutout-pouches.py         # Détoure pouches/src/ vers public/pouches/ (`make pouches`)
└── favicon-template.html     # Gabarit des icônes (`make favicon`)
src/
├── components/
│   ├── SiteHeader.vue        # Barre blanche fixe, liens de part et d'autre du logo (burger en mobile)
│   ├── HeroSection.vue       # Plein écran : vidéo YouTube de fond, accroche h1, poche
│   ├── WavyRibbon.vue        # Bandeau en vague, texte qui défile avec le scroll
│   ├── IconicsSection.vue    # « Les iconiques » : 3 vignettes produits (carrousel en mobile)
│   ├── ProductCard.vue       # Vignette : poche, grappes, bulle au survol
│   ├── EngagementsSection.vue # Cartes blanches inclinées, en quinconce
│   ├── EngagementBurst.vue   # Grappes et feuilles qui jaillissent derrière une carte
│   ├── AboutSection.vue      # « Qui sommes-nous » : vidéo, accroche, 2026, polaroïds
│   ├── YearHighlight.vue     # « 2026 » géant, poche centrée dessus
│   ├── CommunitySection.vue  # « Complètement Pom'Poche » : réseaux + défilé
│   ├── CommunityPost.vue     # Une carte du défilé : photo ou Short YouTube muet
│   ├── SiteFooter.vue        # Grand logo (retour en haut), colline, mentions
│   ├── BrandLogo.vue         # Logo SVG : bouteille + lettrage « Pom'Poche »
│   ├── YouTubePlayer.vue     # Lecteur YouTube auto, muet, en boucle, avec contrôles
│   ├── SocialIcon.vue        # Réseaux parodiques (Picolagram, TikTrinque, FaceBouteille, BeRond) + YouTube
│   ├── GrapeBunch.vue        # Grappe de raisin SVG (dégradés, pruine, reflets)
│   ├── VineLeaf.vue          # Feuille de vigne SVG
│   ├── DoodleArrow.vue       # Flèche dessinée à la main des légendes manuscrites
│   ├── HealthNotice.vue      # Mention « L'abus d'alcool… » (sous les iconiques, pied de page)
│   └── PhotoPlaceholder.vue  # « Photo / Vidéo à venir », filet de sécurité du défilé
├── data/                     # Contenu de la page, zéro logique
│   ├── sections.ts           # Entrées du menu (et ancres des bandeaux)
│   ├── products.ts           # Les 3 iconiques (bulle, poche, grappes)
│   ├── engagements.ts        # Les 3 engagements + composition de la gerbe
│   ├── community.ts          # Réseaux, cartes du défilé, réservoir de Shorts, photos
│   └── grapes.ts             # Palette des grappes (clair, base, sombre), partagée
├── lib/                      # Logique pure, zéro import Vue (entièrement testée)
│   ├── rotation.ts           # Mélange, répartition des Shorts et ordre des secours
│   ├── youtube.ts            # URL d'intégration + messages de l'API iframe
│   ├── grapes.ts             # Disposition des grains d'une grappe, pseudo-aléatoire
│   └── scroll.ts             # scrollToTop (entête et pied de page)
├── App.vue                   # La page : enchaînement des sections
├── index.css                 # Import Tailwind, thème, styles des composants
├── main.ts                   # Point d'entrée
└── vite-env.d.ts
tests/
├── setup.ts                  # jest-dom + matchMedia pour jsdom
├── unit/                     # Vitest : src/lib/
└── component/                # Vitest + Testing Library : la page entière
```

---

## Architecture de la page

### Ordre et ancres

Entête fixe, puis : hero (porte le `h1`), bandeau `#produits`, « Les
iconiques », bandeau `#engagements`, engagements, bandeau `#qui-sommes-nous`,
« Qui sommes-nous », bandeau `#communaute`, « Communauté », pied de page.

- **Chaque section s'ouvre sur un bandeau, qui porte l'ancre** du menu : les
  liens visent les bandeaux, pas les sections.
- Les fonds s'enchaînent en dégradés (lime, crème, lime, bleu ciel du pied de
  page) : changer un fond implique de vérifier les jonctions voisines.
- **L'entête est `position: fixed`** avec `pointer-events: none` sur la bande
  transparente (seule la barre blanche capte les clics), sinon elle bloquerait
  le contenu qui défile dessous.
- **`scroll-padding-top: 11rem`** sur `html` : une ancre atterrit sous l'entête
  (barre + débord du logo). À ajuster si la hauteur de l'entête change.
- Le logo de l'entête, le grand logo du pied de page et sa flèche ramènent en
  haut via `scrollToTop`, qui efface aussi le fragment de l'URL.

### Mode mobile

- **Le desktop ne doit pas bouger** : les adaptations mobiles vivent dans le
  bloc `@media (width < 48rem)` de `index.css`, ou dans des utilitaires
  `md:` / `md:hidden`. Une classe Tailwind non préfixée l'emporte sur
  `@layer components` : une propriété que le mobile redéfinit (largeur, `grid`,
  arrondi de la barre) passe donc en `md:` dans le gabarit.
- **Entête** : logo et burger (`site-nav__burger`) ; le menu déroulant reprend
  les 4 liens. Après 40px de scroll, la barre se resserre en pastille
  (`is-compact`) et le logo rentre dedans.
- **Hero** : accroche centrée, poche affichée dessous (rognée par le bas).
- **Iconiques** : carrousel en `scroll-snap`, pleine largeur, avec flèches et
  points. Le `padding-top` du carrousel laisse dépasser les poches (un
  conteneur en `overflow-x: auto` rogne aussi en vertical).
- **Défilé** : cartes à 62vw.

### Contenu et présentation

- Le contenu (textes, listes, identifiants de vidéos, chemins d'images) vit
  dans `src/data/` ; les composants le mettent en forme. Seuls les contenus
  propres à un seul composant (vidéo du hero, polaroïds) restent en constantes
  dans ce composant.
- **Images de `public/`** : toujours via un `src` lié (`:src="CONSTANTE"`),
  jamais `src="fichier.webp"` en dur dans un gabarit Vue : Vite le prend pour un
  import de module et le build échoue.
- Les classes Tailwind ne doivent **jamais être construites dynamiquement**
  (`text-${color}`) : Tailwind ne les détecte pas. D'où les classes complètes
  dans `engagements.ts`.

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
  bandeau couvre toujours la ligne médiane. Garder cette inégalité.
- Le premier bandeau porte la classe `hero-ribbon` : marge négative d'une
  demi-hauteur et fond transparent au-dessus de la ligne médiane, pour que la
  vidéo du hero apparaisse au-dessus de la vague.
- Props `inverted` (phase de la vague) et `reverse` (sens du défilement),
  alternées d'un bandeau à l'autre.

### Vignettes produits

- **Le survol est 100% CSS** (`.product-card`) : la poche pivote dans l'autre
  sens, les grappes s'écartent (gauche, bas, droite) et la bulle apparaît. Le
  même état s'active sur `:focus` (`tabindex="0"`) : clavier et tap mobile.
- Les grappes sont rognées par `.product-card__fruits` (overflow hidden), pas
  par la carte elle-même, pour que la poche puisse déborder au-dessus.

### Gerbe au survol des engagements

- Chaque `li.engagement-slot` contient la gerbe (`EngagementBurst`) **puis** la
  carte. La gerbe ne peut pas vivre dans la carte : la carte a un `transform`,
  donc crée un contexte d'empilement, et un enfant en `z-index: -1` y serait
  peint au-dessus de son fond blanc.
- La composition est dans `BURST` (`engagements.ts`), en % du slot, centre de
  l'élément. Au repos, chaque élément est rétréci et tiré vers le centre
  (`--dx`/`--dy`) ; au survol il rejoint sa place avec un léger rebond, décalé
  de 25 ms par élément.
- La section est en `overflow-x: clip` : la gerbe de droite déborde de l'écran.

### Polaroïds de « Qui sommes-nous »

- Chaque polaroïd porte une vidéo YouTube, une légende manuscrite et sa flèche
  (`POLAROIDS` dans `AboutSection.vue`). `place` choisit la position de la
  légende : `top-left`, `bottom` ou `top-right` ; la même flèche est retournée
  en CSS (`scaleX` / `scaleY`) selon la position.
- La légende est sœur de la photo, pas enfant : elle ne tourne pas avec elle.
- En mobile, `place` est ignoré : toutes les légendes sont centrées au-dessus
  de leur polaroïd, flèche à droite. L'espace entre polaroïds (9rem) les loge.

### Défilé de la communauté

- La liste des cartes est rendue **deux fois** à la suite ; l'animation `reel`
  translate la piste de `-50%` (plus une demi-gouttière) puis reboucle : défilé
  infini sans saut. Les doublons sont en `aria-hidden` et reçoivent le même
  contenu que leur original.
- Chaque carte oscille autour de son inclinaison (`sway` : ±1,5° et ±6px), avec
  des durées et décalages variés (`nth-child`) pour éviter l'unisson. Le survol
  met le défilé en pause, pas l'oscillation.
- `POSTS` (`community.ts`) fixe la mise en page : réseau et inclinaison de
  chaque carte. Une carte `youtube` reçoit un Short, les autres une photo.
- **Rotation** : à chaque chargement, `SHORTS` et `PHOTOS` sont mélangés
  (`src/lib/rotation.ts`). Les premiers Shorts vont aux cartes ; le reste, plus
  `BACKUP_ONLY` (vidéos horizontales, jamais en premier choix), sert de
  secours. Ajouter un Short ou une photo : l'ajouter à `SHORTS` ou `PHOTOS`.
- **Secours** : chaque carte essaie sa vidéo puis les secours (`withBackups`),
  dans un ordre décalé selon la carte pour que deux cartes en panne ne tombent
  pas sur le même. On passe au suivant sur `onError` du lecteur (vidéo
  supprimée, privée, intégration refusée, bloquée dans le pays) ou si la
  miniature ne charge pas. Tout échoue : `PhotoPlaceholder`.
- Les pastilles de réseaux ne sont pas des liens tant qu'aucun compte n'existe.

### Vidéos YouTube

Trois intégrations, trois URL dans `src/lib/youtube.ts`, toutes muettes (sans
`mute`, les navigateurs bloquent la lecture automatique) :

- `backgroundUrl` (hero) : auto, en boucle, **sans contrôles**. L'iframe 16:9
  est centrée et agrandie pour couvrir le hero (`.hero__frame`), un voile
  (`.hero__video::after`) garde l'accroche lisible, aucun clic n'est capté.
  `HERO_VIDEO_START` (12 s) saute l'intro « Subscribe / Like / Comment / Share ».
- `playerUrl` (`YouTubePlayer` : sous « Pionniers », polaroïds) : auto, en
  boucle, **avec contrôles** pour remettre le son, `loading="lazy"`.
- `embedUrl` (Shorts du défilé) : pilotés par l'API iframe.

Pour les Shorts du défilé :

- **Miniature** `i.ytimg.com/vi/<id>/hqdefault.jpg`, la seule qui existe pour
  tous les Shorts ; 4:3 avec bandes noires, le recadrage `object-fit: cover`
  en 9:16 tombe pile sur la vidéo.
- **Préchargement** (écrans avec survol) : un `IntersectionObserver` (marge
  300px) monte l'iframe dès que la carte approche, et la lance **en lecture
  muette, invisible** sous la miniature. Le survol ne fait que la révéler :
  démarrage mesuré à ~10 ms, contre ~1 s en montant le lecteur au survol.
  Hors écran, le lecteur est en pause. Tactile : pas de préchargement, un tap
  monte le lecteur.
- **Ne pas faire pause / lecture au survol** : YouTube réaffiche alors son
  habillage quelques secondes. Le lecteur tourne donc en continu tant qu'il
  est à l'écran, et le survol tombe en cours de vidéo.
- **Boucle à la main** : `seekTo(0)` juste avant la fin, `loop=1` rechargeant
  la vidéo. YouTube réaffiche quand même titre et boutons ~3 s à chaque tour
  (`controls=0` n'y peut rien) : accepté.
- Pilotage par `postMessage` : `listening` au `load` de l'iframe, puis
  `onReady`, `onError` et les états de lecture (`playerUpdate`). L'iframe ne
  devient visible qu'une fois l'état « lecture » reçu.
- L'iframe est en `pointer-events: none` : le survol reste sur la carte, et le
  son ne peut pas être réactivé.

**Avant d'ajouter une vidéo**, vérifier qu'elle autorise l'intégration :
`youtube.com/oembed?url=...` répond 401 sinon, et le lecteur affiche « Vidéo
non disponible ».

### Poches détourées

- `pouches/src/` garde les maquettes d'origine ; `public/pouches/` contient les
  WebP détourés, générés mais versionnés (Vercel n'a ni Pillow ni ImageMagick).
- `make pouches` (ou `python3 scripts/cutout-pouches.py <nom>`) régénère. Le
  détourage suppose **le gabarit commun** des maquettes (671x1024, poche aux
  mêmes coordonnées) : le corps est un contour fixe, le bouchon est isolé par
  son vert saturé. Une maquette d'un autre cadrage demande d'ajuster le contour
  dans le script.
- Placement : `cabernet` dans le hero, `velo` / `mamie` / `grappe` dans les
  iconiques (`products.ts`), `degustation` sur le « 2026 ».

### Favicon

Le favicon est un PNG et non un SVG : un SVG utilisé comme image ne charge pas
de police, le lettrage Pacifico tomberait. `scripts/favicon-template.html`
duplique le SVG de `BrandLogo.vue` ; **après un changement du logo, reporter la
modification dans le gabarit puis lancer `make favicon`** (nécessite Chrome).

### Référencement et image de partage

- Les crawlers refusent les URL relatives pour `og:image`. `index.html` porte
  donc des jetons `%SITE_URL%` (canonique, `og:url`, `og:image`, JSON-LD)
  résolus au build par le plugin `inject-site-url` de `vite.config.ts` :
  `SITE_URL`, sinon `VERCEL_PROJECT_PRODUCTION_URL`, sinon l'adresse publique.
  Ne pas écrire d'URL absolue en dur dans `index.html`.
- `robots.txt` et `sitemap.xml` sont servis tels quels (pas de jeton possible
  dans `public/`) : ils portent l'adresse publique en dur. À changer avec elle.
- Le JSON-LD est un `WebSite` schema.org inline : vérifier qu'il reste du JSON
  valide après modification, personne ne le compile.
- **L'image de partage est rendue, pas dessinée** : `og.html` monte
  `tools/OgCard.vue`, qui assemble les vrais composants (logo, bandeau, grappes,
  feuilles) et les vraies poches détourées. `make og` lance Vite sur un port
  dédié et capture la page en 1200x630 avec Chrome. Après un changement de
  logo, de poches ou de bandeau, relancer `make og`, et refaire les captures de
  `docs/images/` si l'interface a changé.
- `og.html` n'est pas une entrée du build : elle n'existe qu'en développement.

### Captures automatisées

En Chrome headless, forcer
`--blink-settings=availableHoverTypes=2,primaryHoverType=2` : sinon Chrome
rapporte `hover: none`, les états de survol ne sont jamais rendus et les
Shorts ne sont pas préchargés.

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
- `src/data/` : contenu, zéro logique.
- `src/lib/` : logique pure, zéro import Vue, entièrement testée.
- `src/components/` : présentation, en SFC `<script setup lang="ts">`.
- **Taille des fichiers** : viser < ~300 lignes ; au-delà, découper.

### Qualité du code
- **Factoriser, ne pas dupliquer** : extraire les helpers et composants
  réutilisables.
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
| `make preview` | Build puis prévisualisation locale |
| `make lint` | ESLint |
| `make knip` | Détecte fichiers / exports / dépendances inutilisés |
| `make format` | Formate avec Prettier |
| `make format-check` | Vérifie le formatage |
| `make typecheck` | Vérifie les types |
| `make test` | Tests unitaires et composants |
| `make fix` | Format + lint |
| `make check` | build + lint + typecheck + knip + tests |
| `make og` | Régénère l'image de partage `public/og.png` (nécessite Chrome) |
| `make pouches` | Détoure les maquettes de `pouches/src/` vers `public/pouches/` |
| `make favicon` | Régénère `favicon.png` et `apple-touch-icon.png` (nécessite Chrome) |
| `make clean` | Supprime `dist`, `node_modules`, `coverage` |

---

## Conventions globales du dépôt

- **Code en anglais** : commentaires, identifiants, noms de variables et de
  fonctions. Seules les valeurs affichées à l'utilisateur sont en français.
- **Commits** : pas de trailer `Co-Authored-By`. Vaut aussi pour les
  descriptions de pull request.
- **Typographie** : ne jamais introduire de tiret long (em-dash ou en-dash) dans
  le code, les chaînes, les commentaires ou la doc. Utiliser un tiret ASCII `-`,
  deux-points, parenthèses, ou reformuler.
