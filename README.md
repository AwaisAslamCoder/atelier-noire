# ATELIER NOIR — Luxury Menswear Website

An editorial, responsive, **front-end-only** luxury formalwear website built using **HTML, CSS and JavaScript**. No Node.js installation or build system needed.

## Run locally in Visual Studio Code

1. Extract this ZIP.
2. Open the `maison-noir` folder in Visual Studio Code (**File → Open Folder**).
3. Install the VS Code extension **Live Server** by Ritwick Dey (optional but recommended).
4. Right-click `index.html` → **Open with Live Server**.
5. Your site should open at a local URL such as `http://127.0.0.1:5500/index.html` (the port may differ).

You can alternatively double-click `index.html` to open the file in your browser. An internet connection is required for the image, font and animation CDN assets.

## Scroll animations included

- **Scroll-driven:** GSAP ScrollTrigger drives animation progress.
- **Parallax:** slow-moving hero background, collection photos and editorial image.
- **Scroll-triggered:** sections and text reveal as they enter the viewport.
- **Scrubbing:** animations follow the current scroll position.
- **Pinning/sticky:** 3-stage tailoring story pins in place on desktop.
- **Smooth scrolling:** Lenis plus GSAP ticker synchronization.
- **Responsive:** mobile navigation and mobile-friendly scrolling.
- **Accessibility:** reduced-motion support, labels and keyboard-friendly anchors.

## Publish to GitHub Pages — get a public link

1. Sign in to GitHub and choose **New repository** (e.g. `atelier-noir`).
2. Set the repo to **Public**. Click **Create repository**.
3. Choose **uploading an existing file** on GitHub and upload the three files in this folder (`index.html`, `styles.css`, `script.js`) plus README. Do not upload the ZIP as the website itself.
4. Commit the files.
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, set source to **Deploy from a branch**; select `main` and folder `/ (root)`; click **Save**.
7. Your shareable link will typically be `https://YOUR-USERNAME.github.io/atelier-noir/` once deployment completes.

**Important:** `localhost`/`127.0.0.1` works only on your own machine. GitHub Pages gives you a *public* website URL you can share with your teacher.

## Optional: Git commands (instead of manual uploading)

```bash
git init
git add .
git commit -m "Build Atelier Noir luxury menswear site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/atelier-noir.git
git push -u origin main
```

Create an empty repository on GitHub first, and replace `YOUR-USERNAME`.

## Customize

- Brand and copy: edit `index.html`.
- Colors, layout, image links: edit `styles.css`.
- Scroll animation timing: edit `script.js`.
- Contact form is **demo-only**; no email is actually sent, and no form details are stored. Connect Formspree, Netlify Forms, or a backend if you want submissions.
- Images are referenced from Unsplash URLs; use images you own or are licensed to use for real commercial deployment.

## Tech used

HTML5, CSS3, vanilla JavaScript, GSAP 3 + ScrollTrigger, Lenis, Google Fonts. All library scripts and images are loaded from remote CDNs.
