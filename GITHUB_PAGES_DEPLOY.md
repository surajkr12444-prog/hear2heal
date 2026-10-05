# GitHub Pages deployment

1. Create a new GitHub repository (for example `hear2heal`).
2. Upload/push the CONTENTS of this `meditranslate` folder to the repository root.
3. Do not upload `node_modules`.
4. Push to the `main` branch.
5. GitHub: Settings -> Pages -> Build and deployment -> Source -> GitHub Actions.
6. Open the Actions tab and wait for `Deploy Hear2Heal to GitHub Pages` to finish.
7. Your site URL will be shown in the deploy job and in Settings -> Pages.

Local check before push:
```bash
npm install
npm run build
npm run preview
```

The project is configured with relative Vite asset paths and scope-safe service-worker URLs,
so it can run from a GitHub Pages project URL such as:
`https://USERNAME.github.io/REPOSITORY/`
