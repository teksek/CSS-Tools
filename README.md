# CSS Tools

Zestaw generatorów CSS do tworzenia zaawansowanych stylów. Projekt napisany w czystym JavaScript w ciągu tygodnia pod koniec wakacji 2024.

**Live demo:** [https://teksek.github.io/CSS-Tools](https://teksek.github.io/CSS-Tools)

## Dostępne narzędzia

### Box-Shadow Generator
Generator cieni CSS z pełną kontrolą parametrów:
- Pozycja cienia (horizontal/vertical offset)
- Rozmycie i rozproszenie (blur/spread radius)
- Kolor cienia, tła i elementu
- Kontrola przezroczystości
- Przełącznik outline/inset
- Konwersja hex na RGBA
- Live preview z gotowym kodem CSS

### Gradient Generator
Generator gradientów liniowych i radialnych:
- Typ gradientu (linear/radial)
- Dynamiczne dodawanie kolorów (2-6)
- Kontrola kąta dla gradientów liniowych
- Pozycjonowanie kolorów (stops)
- Powiększony podgląd
- System powiadomień

### Planowane narzędzia
- Border Generator
- Glassmorphism Generator

## Technologie
Vanilla JavaScript, HTML5, CSS3. Bez frameworków.

### Konwersja kolorów
```javascript
function hexToRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
}
```

### Dynamiczne komponenty
- Klasa `Color` - zarządzanie kolorami gradientu
- Klasa `Popup` - system powiadomień

## Struktura
```
├── index.html              # Strona główna
├── boxshadow.html         # Generator box-shadow
├── gradient.html          # Generator gradientów
├── border.html            # Generator borderów (WIP)
├── glassmorphism.html     # Generator efektu szkła (WIP)
├── style.css              # Style globalne
└── js/
    ├── boxshadow.js       # Logika box-shadow
    ├── gradient.js        # Logika gradientów
    ├── border.js          # Logika borderów (WIP)
    └── glassmorphism.js   # Logika efektu szkła (WIP)
```

## Uruchomienie lokalnie
```bash
git clone https://github.com/teksek/CSS-Tools.git
# Otwórz index.html w przeglądarce
```

## Kontekst
Projekt hobbystyczny stworzony samodzielnie w tydzień jako narzędzie dla frontendowców.
