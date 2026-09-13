# Apex Resume Builder 📄⚡

> **ATS-Optimized Resume Engine, Real-Time Keyword Matcher & Executive Bullet Refactor Tool**

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Build: Passing](https://img.shields.io/badge/Build-Passing-brightgreen.svg)
![Engine: Client--Side](https://img.shields.io/badge/Privacy-100%25%20On--Device-success.svg)
![Framework: React](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-61DAFB.svg)

---

## 📌 Executive Summary

**Apex Resume Builder** is a modern, high-precision resume engineering tool built to help software engineers and tech professionals craft single-page, ATS-compliant resumes with real-time feedback. 

Unlike generic document editors, Apex integrates real-time heuristic ATS scoring, job description keyword vector matching, bullet-point impact auditing (XYZ formula enforcement), and automated layout budget management—ensuring candidates pass initial automated screenings at enterprise recruitment pipelines.

---

## ⚡ Key Capabilities & Architecture

* **Deep ATS Health Auditor:**
  * Real-time structural scanner benchmarked against Fortune 500 applicant tracking systems (Greenhouse, Workday, Lever).
  * Automatically flags weak passive verbs (e.g., "Responsible for", "Worked on") and suggests executive power verbs.
  * Audits metric density and quantifies achievement percentages across experience points.

* **Targeted Job Description (JD) Keyword Matcher:**
  * Ingests target job postings, extracts core technical keywords and competencies, and matches them against resume content.
  * Surfaces missing technical competencies with one-click keyword injection into relevant skill categories.

* **Single-Page Layout Budget Engine:**
  * Real-time page capacity computation (98–100% tight budget indicator) that automatically calculates margins, gaps, line heights, and font scaling levels (L0 to L4) to guarantee single-page fit.
  * Instant switching between standard **A4** and **US Letter** formatting.

* **Modular Experience & Project Builders:**
  * Drag-and-drop section reordering with real-time reactive markdown preview.
  * Rapid setup wizard for fast onboarding and multi-role template presets (Full-Stack, AI/ML, DevOps, Product).

* **Private Shareable Web Portfolio Generation:**
  * Generates an instant, client-encoded web portfolio URL (via URL hash state) and downloadable QR code without requiring a persistent database backend.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph INPUT["1. Content Input & Rapid Setup"]
        A["User Input / Setup Wizard / JSON"] --> B["Section State Manager"]
        C["Target Job Description"] --> D["JD Keyword Tokenizer"]
    end

    subgraph ENGINE["2. Heuristic Audit & Optimization Core"]
        B --> E["ATS Structural Health Auditor"]
        B --> F["XYZ Achievement Metric Scorer"]
        D & B --> G["Cosine / Set Keyword Match Engine"]
        
        E --> H["Verb Strength & Metric Density Score"]
        G --> I["Skill Gap & Missing Keywords Matrix"]
    end

    subgraph LAYOUT["3. Layout Budget & Typography Engine"]
        B --> J["Content Height & Line Budget Calculator"]
        J --> K{"Single-Page Limit Check"}
        K -->|"Exceeds Budget"| L["Auto-Fit Dynamic Scaling (L0-L4)"]
        K -->|"Within Budget"| M["Standard Typographic Mesh"]
    end

    subgraph OUTPUT["4. Output & Distribution Channels"]
        L & M --> N["Live Desktop Artboard Preview"]
        H & I --> N
        N --> O["High-Precision PDF Export"]
        N --> P["URL-Encoded Shareable Portfolio & QR"]
    end

    style INPUT fill:#18181b,stroke:#3f3f46,stroke-width:1px,color:#fafafa
    style ENGINE fill:#18181b,stroke:#3f3f46,stroke-width:1px,color:#fafafa
    style LAYOUT fill:#18181b,stroke:#3f3f46,stroke-width:1px,color:#fafafa
    style OUTPUT fill:#18181b,stroke:#3f3f46,stroke-width:1px,color:#fafafa
    style K fill:#27272a,stroke:#6366f1,stroke-width:1px,color:#fafafa
    style N fill:#27272a,stroke:#10b981,stroke-width:1px,color:#fafafa

---
