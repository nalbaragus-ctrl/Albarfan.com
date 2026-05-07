# 🌐 Personal Portfolio Website

A clean, Apple-inspired portfolio website built with React — featuring a light mode UI, optimized media delivery, and full analytics integration.

---

## 🛠 Tech Stack

| Layer         | Tool             |
| ------------- | ---------------- |
| Frontend      | React            |
| Deployment    | Netlify          |
| Custom Domain | Hostinger        |
| Asset Storage | Cloudflare R2    |
| Analytics     | Google Analytics |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MediaGallery.js / .css
│   ├── ProjectDetail.js / .css
│   └── WorkDetail.js / .css
├── data/
│   ├── ProjectDetails.json
│   ├── Projects.json
│   ├── WorkDetails.json
│   └── WorkExperience.json
├── App.js / App.css
├── index.js / index.css
├── Projects.js / Projects.css
└── WorkExperience.js / WorkExperience.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm

### Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm start
```

The app will run at `http://localhost:3000`.

---

## 🏗 Build & Deployment

### Build

```bash
npm run build
```

This outputs a production-ready `build/` folder.

### Deploy to Netlify

This project is deployed via **Netlify** with continuous deployment from the main branch.

- Build command: `npm run build`
- Publish directory: `build`

> Any push to `main` triggers an automatic redeploy on Netlify.

---

## 🌍 Custom Domain (Hostinger)

The site uses a custom domain registered and managed through **Hostinger**.

To connect your domain to Netlify:

1. In Netlify, go to **Domain Settings** → Add your custom domain.
2. In your Hostinger DNS panel, set the following records:

| Type  | Name | Value                   |
| ----- | ---- | ----------------------- |
| A     | @    | `75.2.60.5`             |
| CNAME | www  | `your-site.netlify.app` |

3. Enable HTTPS in Netlify (usually auto-provisioned via Let's Encrypt).

---

## ☁️ Asset Storage (Cloudflare R2)

Static media assets (images, videos, etc.) are stored in **Cloudflare R2** to reduce build size and improve global delivery speed.

### Accessing Assets

Assets are served via a public R2 bucket URL. Reference them in your code like:

```js
const ASSET_BASE_URL = "https://your-bucket.r2.dev";

// Example usage
<img
  src={`${ASSET_BASE_URL}/projects/my-image.png`}
  alt="Project screenshot"
/>;
```

### Uploading Assets

Use the Cloudflare dashboard or the `wrangler` CLI:

```bash
npx wrangler r2 object put your-bucket/projects/my-image.png --file ./my-image.png
```

---

## 📊 Google Analytics

Google Analytics is integrated for tracking site visits and user behavior.

### Setup

1. Create a property at [analytics.google.com](https://analytics.google.com).
2. Copy your **Measurement ID** (e.g., `G-XXXXXXXXXX`).
3. Add it to your `index.html` inside the `<head>`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

---

## 🎨 Design

- **Theme:** Light mode, Apple-inspired aesthetic
- **Typography:** Clean sans-serif, generous whitespace
- **Color palette:** Whites, soft grays, and subtle accent tones

---

## 📄 License

This project is for personal use. Feel free to fork and adapt for your own portfolio.
