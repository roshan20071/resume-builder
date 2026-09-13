# Dual-Engine Resume Builder 📄🚀

An advanced, dual-engine resume builder built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Designed for maximum ATS (Applicant Tracking System) pass rates while offering sleek modern designs.

---

## ✨ Key Features

- 🎯 **Dual-Engine Architecture**: Seamlessly switch between ATS-compliant Classic Layouts and visually stunning Modern Designs.
- 🤖 **ATS Parser Simulator & Score**: Real-time ATS parsing audit with instant scoring badges, sparklines, and actionable feedback.
- ⚡ **Smart Bullet Optimization**: AI-assisted bullet point rewriter, verb strengthener, and interview bullet generator.
- 📊 **Page Budgeting & Auto-Fit**: Interactive visual page budget bar to prevent messy overflow lines across page boundaries.
- 💼 **Job Description (JD) Matcher**: Compare your resume against target job listings to identify keyword gaps.
- 📥 **Flexible Imports**: Import data via PDF parsing, LinkedIn format, GitHub profiles, or raw plain text.
- ✉️ **Cover Letter Generator**: Create contextual cover letters aligned directly with your resume content.
- 🔄 **Version History & Slots**: Manage multiple resume variants and easily restore previous versions.
- 📤 **Multi-Format Export**: Export clean print-ready PDFs, JSON data, and generate shareable online portfolio links with QR codes.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Validation**: [Zod](https://zod.dev/)
- **PDF & Compression**: `pdfjs-dist`, `lz-string`, `qrcode.react`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18+ or v20+)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dual-engine-resume-builder.git
   cd dual-engine-resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router (pages, layout, styles)
├── components/
│   ├── editor/           # Form inputs, wizards, importers, optimizers
│   └── preview/          # Resume canvas, templates, ATS simulators, export
├── src/
│   ├── hooks/            # Custom hooks (page budget, auto-fit)
│   ├── schema/           # Zod data schemas
│   ├── store/            # Zustand state management
│   ├── styles/           # Design tokens & CSS variables
│   ├── types/            # TypeScript definitions
│   └── utils/            # ATS simulator, parsers, export helpers
└── public/               # Static assets
```

---

## 📜 License

MIT License. Feel free to use and customize for your own job search journey!
