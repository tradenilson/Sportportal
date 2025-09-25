# Sportportalen (GitHub Pages – superenkel)

Ingen server, ingen databas. GitHub Actions uppdaterar sidan var **45:e minut**.

## Starta på 2 minuter
1) Skapa en **ny GitHub-repo** (public), t.ex. `sportportalen`.
2) Ladda upp alla filer från denna zip till repot (drag & drop).
3) Aktivera **GitHub Pages**: Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main** / **/(root)** → Save.
4) Kör första uppdateringen manuellt: GitHub → **Actions** → *Update News* → **Run workflow**.

Klart! Publik URL: `https://<ditt-användarnamn>.github.io/sportportalen/`

### Vad uppdateras?
- `data/news.json` fylls med rubriker från: `gp.se`, `dn.se`, `svd.se`, `expressen.se`, `aftonbladet.se`.
- Topics: Frölunda HC, Brynäs IF, V75, Stryktipset.
