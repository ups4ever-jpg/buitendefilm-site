# BUITEN – De Film
### Website van Alexa Hakkenbrak

---

## 🎬 Over het project

Een cinematische, minimalistische one-page website voor de Rotterdamse film **BUITEN** van regisseur Alexa Hakkenbrak. De site heeft een arthouse/bioscoop-uitstraling: donkerblauw, nachtelijk, rauw, stedelijk en emotioneel. Mobiel-eerst ontworpen met subtiele animaties en een heldere gebruikersflow: **zien → voelen → lezen → aanmelden**.

---

## ✅ Gerealiseerde functies

### Design & Stijl
- Cinematische donkere huisstijl: deep navy / zwart / wit / lime-groen accent (#DAFF0F)
- Bebas Neue display-lettertype voor bioscoopwaardige koppen
- DM Serif Display voor emotionele citaten en taglines
- Inter voor bodytekst (licht, leesbaar)
- Subtiele fade-in animaties en scroll-reveal effecten
- Polaroid-stijl sfeerbeelden met hover-animaties
- Custom lime cursor-accent op desktop
- Filmische hero met parallax-achtige pan animatie op de poster

### Secties (one-page)
1. **Hero** – Fullscreen posterachtergrond, grote BUITEN-titel, tagline, twee CTA-knoppen
2. **Over de film** – Volledige synopsis, filmstatement, creditregel en posterafbeelding
3. **Sfeer / Stills** – 5 polaroid-stijl foto's (uitsneden van de poster)
4. **Workshops & Casting** – Bulletpoints, planningsoverzicht per datum, info over auditie
5. **Aanmeldformulier** – 8 velden met validatie, verzending via Formspree, succesmelding
6. **Footer** – Alle credits, e-mail, Instagram-link en website-link

### Navigatie
- Vaste topnavigatie met anchor links: Home / Over de film / Aanmelden / Contact
- Automatisch actieve link op basis van scrollpositie
- Hamburger-menu voor mobiel
- Scrolled-state met glazen blur-effect

### Formulier & Data
- Clientside validatie (verplichte velden, emailformat, leeftijdsbereik)
- Aanmeldingen worden verzonden via Formspree naar `info@buitendefilm.nl`
- Succesmelding na verzending: "Tof dat je je hebt aangemeld voor BUITEN."

---

## 🔗 Entry URI's

| Pagina | Pad |
|--------|-----|
| Homepage | `/index.html` |
| Hero anchor | `/#home` |
| Over de film | `/#film` |
| Sfeer/Stills | `/#stills` |
| Workshops | `/#workshops` |
| Aanmeldformulier | `/#aanmelden` |
| Contact/Footer | `/#contact` |

---

## 📁 Bestandsstructuur

```
index.html              – Hoofdpagina (one-page)
css/
  style.css             – Volledige styling
js/
  main.js               – Animaties, navigatie, formulier
images/
  poster.jpg            – BUITEN filmsposter (gebruikt in hero + polaroids)
README.md               – Projectdocumentatie
```

---

## 🔧 Technische keuzes

- **Geen backend nodig** – volledig statisch met Formspree voor formulierverzending
- **CDN bibliotheken**: Google Fonts (Bebas Neue, DM Serif Display, Inter), Font Awesome 6
- **IntersectionObserver** voor performante scroll-reveal animaties
- **CSS Custom Properties** voor consistent kleurenbeheer
- **Mobile-first** responsive breakpoints: 640px (mobiel), 900px (tablet)
- **Smooth scroll** via JS met nav-hoogte compensatie

---

## 🚀 Volgende stappen / nog niet geïmplementeerd

- [ ] Echte filmstills/foto's toevoegen zodra beschikbaar (nu posteruitsneden als placeholder)
- [ ] Eventueel teaser/trailer video embedden in de hero of aparte sectie
- [ ] E-mail notificatie instellen voor nieuwe aanmeldingen
- [ ] Countdown timer naar eerste workshopdatum (6 mei)
- [ ] Press-kit / persmap downloadpagina

---

## 📬 Contact

**Regie:** Alexa Hakkenbrak  
**DOP:** Ted Heil  
**Productie:** Tom Monteban  
**Uitvoerend Producent:** Uriah Paul-Simon  

📧 info@buitendefilm.nl  
🌐 www.buitendefilm.nl  

---

*© 2026 BUITEN – De Film · Rotterdam*
