# Integracja systemów informatycznych
## Laboratorium 3: Integracja z zewnętrznymi API i przetwarzanie danych

Aplikacja zbudowana w SvelteKit z użyciem Bun jako runtime i package manager.

## Wymagania

- [Bun](https://bun.sh/) w wersji `1.3.11` lub nowszej

Sprawdzenie wersji Bun:

```bash
bun --version
```

##### Jeżeli brak, należy zainstalować Bun:

Windows:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```
Linux / macOS:
```bash
curl -fsSL https://bun.sh/install | bash
```

## Instalacja

Sklonuj repozytorium i zainstaluj zależności:

```bash
git clone https://github.com/GPrzyborowski/integration-lab3.git
cd integration-lab3
bun install
```

## Zmienne środowiskowe

Utwórz plik `.env` w głównym katalogu projektu i dodaj:

```env
GEMINI_API_KEY=klucz_api
```

Klucz API można wygenerować za darmo (free tier = 20 requestów na dobę) tutaj: [Google AI Studio](https://aistudio.google.com/app/apikey).

## Uruchomienie

```bash
bun run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:5173](http://localhost:5173).

## Testy

```bash
bun run test
```