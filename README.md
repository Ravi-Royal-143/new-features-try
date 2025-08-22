# Test

## GitHub Pages Deployment & 404 Troubleshooting

If you see a 404 or "File not found" after deploying to GitHub Pages:

1. **Check Pages settings:**
   - Go to your repo on GitHub → Settings → Pages.
   - Ensure "Source" is set to **GitHub Actions**.
   - Save if needed.

2. **Check build output:**
   - The Angular build must output to `dist/test` (see `angular.json`).
   - The output folder must contain an `index.html` file.

3. **Check workflow:**
   - `.github/workflows/pages.yml` should upload the correct folder (`dist/test`).
   - The deploy step must use the artifact from the build.

4. **Case sensitivity:**
   - URLs and filenames are case-sensitive. Ensure `index.html` is lowercase and present.

5. **Wait for deployment:**
   - After a successful workflow run, it may take a minute for the site to update.

6. **Access your site:**
   - The URL is usually `https://<username>.github.io/<repo>/`.
   - If you see a 404, check the above steps and the Actions tab for errors.

For more, see [GitHub Pages docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

## 🎨 UI Improvements

This app now features a colorful and modern design with:

- **Gradient backgrounds** with beautiful color schemes
- **Inter font** from Google Fonts for better readability
- **Material Design integration** with custom styling
- **Responsive design** that works on all devices
- **Smooth animations** and hover effects
- **Accessibility improvements** with proper focus indicators
- **Card-based layout** with depth and shadows

## 🚀 Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### GitHub Pages Testing

- `npm run build:gh-pages` - Build for GitHub Pages with correct base href
- `npm run serve:gh-pages` - Build and serve locally to test GitHub Pages setup

### Code Quality

- `npm run fix:prettier` - Format code with Prettier
- `npm run fix:lint:strict` - Fix linting issues with strict rules
- `npm run fix:all` - Run both prettier and strict linting
- `npm run check:all` - Run build, test, and lint checks

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/test/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
