 # Extract From Url

 Extract content from any webpage and export it in multiple formats (TXT, HTML, Markdown, Copy to Clipboard) with ease.

 ## Table of Contents
 - [Features](#features)
 - [Technologies Used](#technologies-used)
 - [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Development](#development)
   - [Build](#build)
   - [Preview](#preview)
 - [Usage](#usage)
 - [Configuration](#configuration)
 - [Project Structure](#project-structure)
 - [Available Scripts](#available-scripts)
 - [Contributing](#contributing)

 ## Features
 - Extracts the main body text of webpages, removing scripts, ads, headers, footers, and sidebars.
 - Automatic detection of content areas (`<main>`, `<article>`, `.content`, `#content`, fallback to `<body>`).
 - Advanced include/exclude CSS selectors for custom extraction.
 - Real-time URL validation with user-friendly messages.
 - Multiple export options:
   - Copy to Clipboard
   - Download as TXT
   - Download as styled HTML
   - Download as Markdown
 - Responsive and accessible UI built with React and Tailwind CSS.
 - Uses CORS proxy fallbacks for reliable content fetching.

 ## Technologies Used
 - [React](https://reactjs.org/)
 - [Vite](https://vitejs.dev/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [Lucide Icons](https://lucide.dev/)

 ## Getting Started

 ### Prerequisites
 - Node.js v16 or newer
 - npm (comes with Node.js)

 ### Installation
 ```bash
 git clone https://github.com/positron/urlToText.git
 cd urlToText
 npm install
 ```

 ### Development
 Start the development server:
 ```bash
 npm run dev
 ```
 Open your browser at `http://localhost:5173`.

 ### Build
 Generate a production-ready build:
 ```bash
 npm run build
 ```
 The output will be in the `dist/` directory.

 ### Preview
 Preview the production build locally:
 ```bash
 npm run preview
 ```

 ## Usage
 1. Enter a valid URL (must start with `http://` or `https://`).
 2. (Optional) Click **Advanced Options** to specify CSS selectors to include or exclude content areas.
 3. Click **Extract Content** and wait for the results.
 4. Use the floating toolbar to:
    - Copy extracted text to clipboard
    - Download as TXT file
    - Download as styled HTML file
    - Download as Markdown file

 ## Configuration
 - CORS proxy endpoints can be adjusted in `src/utils/contentExtractor.ts` under `CORS_PROXIES`.
 - Tailwind CSS settings in `tailwind.config.js`.
 - Vite configuration in `vite.config.ts`.

 ## Project Structure
 ```
 .
 ├── src/
 │   ├── components/       # Reusable React components
 │   ├── utils/            # Extraction, export, and validation helpers
 │   ├── types/            # TypeScript interfaces
 │   ├── App.tsx           # Main application component
 │   ├── main.tsx          # React entrypoint
 │   └── index.css         # Global styles
 ├── public/               # Static assets (if any)
 ├── index.html            # HTML template
 ├── package.json          # npm scripts and dependencies
 ├── tailwind.config.js    # Tailwind CSS configuration
 ├── postcss.config.js     # PostCSS configuration
 ├── vite.config.ts        # Vite configuration
 └── tsconfig.json         # TypeScript configuration
 ```

 ## Available Scripts
 - `npm run dev` — Start development server
 - `npm run build` — Build for production
 - `npm run preview` — Preview production build
 - `npm run lint` — Run ESLint

 ## Contributing
 Contributions are welcome! Feel free to open an issue or submit a pull request.