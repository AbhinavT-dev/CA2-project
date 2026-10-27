# 🌊 AquaPure: Microplastics in Drinking Water — Reasons, Health Risks & Solutions

An enterprise-grade, polyglot research and simulation web portal developed for Computer Science & Engineering (CSE) academic evaluations, combining **HTML5**, **CSS3**, **Modern JavaScript (ES6+)**, **Python 3.14 (Flask & NumPy)**, and **Java 17 (Enterprise Concurrency & Strategy Pattern)**.

---

## 🔬 Core Scientific Scope

### 1. Root Causes & Contamination Pathways
- **Bottled Water Packaging & Cap Friction:** Every twist of high-density polyethylene (HDPE) caps sheds tens of thousands of microscopic PET/PP shards directly into water (Columbia University 2024 SRS microscopy study: **~240,000 plastic particles per liter**; 90% nanoplastics).
- **Synthetic Textile Laundering:** A single laundry wash load releases up to **700,000 polyester/nylon microfibers** into wastewater effluents that bypass conventional municipal sedimentation.
- **Municipal PVC Infrastructure:** Aging distribution pipelines slough off polymer flakes under chlorine disinfection and hydraulic shear wear.
- **Atmospheric Deposition ("Plastic Rain"):** Windborne tire wear and synthetic dust fall into open reservoirs and municipal freshwater sources.
- **Hot Household Plastics:** Plastic electric kettles and pyramid tea bags shed **billions of particles per single boiling cycle**.

### 2. Biological & Cellular Health Impacts
- **Gastrointestinal Barrier Translocation:** Micro-abrasions on the intestinal epithelium, mucus barrier depletion, and gut microbiome dysbiosis.
- **Cardiovascular & Bloodstream:** Nanoplastics (< 1 µm) penetrate cell membranes into mesenteric lymphatics. Landmark **New England Journal of Medicine (NEJM, Mar 2024)** study proved microplastics inside carotid plaques confer a **4.53-fold higher risk** of myocardial infarction and stroke.
- **Endocrine Disruption:** Leaching of toxic chemical additives, including Bisphenol A (BPA), Phthalates, and PFAS ("forever chemicals").

### 3. Proven Scientific Solutions & Removal Technologies
- **Thermal Calcium Carbonate Co-Precipitation (Boiling Hard Water):** Landmark 2024 *Environmental Science & Technology Letters* discovery: boiling calcium-rich hard tap water causes limescale ($\text{CaCO}_3$) to encapsulate up to **90% of microplastics and nanoplastics**, which are easily filtered with paper coffee filters.
- **Reverse Osmosis (RO):** Pore size **0.0001 µm (0.1 nm)**, removing **>99.9%** of all micro- and nanoplastics.
- **Hollow Fiber Ultrafiltration (UF):** Pores down to **0.01 µm**, removing **96%** of fibers and particles without stripping essential minerals.
- **Solid Carbon Block:** Pores down to **0.5 µm**, capturing **82%** of microplastics and eliminating chlorine.

---

## 🛠️ Polyglot Engineering Architecture

| Tier | Technology | Role & Capabilities |
| :--- | :--- | :--- |
| **Presentation Tier** | **HTML5 + CSS3 + ES6+** | Responsive glassmorphic UI, Virtual Optical/Raman Microscope (HTML5 Canvas physics simulator), dynamic scale zoom, Chart.js visualizations, personal risk calculator, interactive 5-question certification quiz, and real-time backend status monitor. |
| **Analytical AI Tier** | **Python 3.14 + Flask + NumPy** | Port **5000**: Advanced numerical matrix modeling (`/api/risk-analysis`) predicting 10-year cumulative cellular organ deposition curves, Darcy-flux membrane simulation (`/api/simulate-filter`), and global meta-analysis datasets (`/api/dataset`). |
| **Enterprise Engine** | **Java 17 (OpenJDK)** | Port **8080**: High-performance multi-threaded computational engine using **Strategy Design Pattern** (`ReverseOsmosisStrategy`, `BoilingPrecipitationStrategy`, `UltrafiltrationStrategy`, `ActivatedCarbonStrategy`) and Java Concurrency (`ExecutorService` / `CompletableFuture`) for concurrent batch filtration auditing. |

---

## 🚀 Quick Start Guide

### Option 1: Single-Click Full Stack Launch (Recommended)
Double-click `run_all.bat`. This automatically:
1. Compiles the Java 17 backend with `javac`.
2. Starts the Java 17 Microservice on `http://localhost:8080`.
3. Starts the Python Flask & NumPy API on `http://localhost:5000`.
4. Opens the full interactive web application in your default browser.

### Option 2: Standalone Browser Mode (Zero Server Dependency)
Simply double-click `index.html` to open directly in any browser (Chrome, Edge, Firefox). The portal includes intelligent client-side fallbacks for all calculations and simulations.

### Option 3: Manual Command Line Launch

#### 1. Compile & Start Java Engine:
```bash
javac -d bin backend_java\model\*.java backend_java\strategy\*.java backend_java\engine\*.java backend_java\server\*.java backend_java\Main.java
java -cp bin backend_java.Main
```
*(Listening on http://localhost:8080)*

#### 2. Start Python Analytics Server:
```bash
python server.py
```
*(Listening on http://localhost:5000)*

#### 3. Stop All Services:
Double-click `stop_all.bat`.

---

## 📊 Interactive Features in the Portal

1. **Virtual Optical & Raman Microscope**: Interactive HTML5 Canvas simulating real-time fluid particle dynamics (PET, PP, Polystyrene, and Microfibers) with particle deflection physics and an RO/Boiled Purification trigger.
2. **Interactive Size Scale Explorer**: Dynamic slider spanning Macroplastics (>5mm) down to Nanoplastics (<1µm) with cellular risk benchmarks.
3. **Personal Microplastic Exposure Calculator**: Computes weekly/annual particles ingested and equivalent **plastic credit cards/year** with personalized mitigation protocols.
4. **Interactive Human Body Scanner**: Anatomical diagnostics for Gut, Cardiovascular, Endocrine, DNA, and Placenta/Blood-Brain barriers.
5. **Interactive Filter Matrix**: Side-by-side comparative table with instant filtering by Budget, Zero Electricity, and Nanoplastic Trapping capability.
6. **Live Java Concurrency Benchmark**: Dispatches live requests to Java 17 ThreadPoolExecutor to benchmark real-time filtration algorithms.
7. **Certified Clean Water Advocate Quiz**: 5-question assessment with instant scoring, scientific explanations, and verified digital completion badge.
8. **Interactive Pledge Tracker & Persistent Checklist**: Saves habits locally in browser storage.

---

## 📚 Key Research References

- **Columbia University (2024):** *Rapid single-particle chemical imaging of nanoplastics by SRS microscopy.* Proceedings of the National Academy of Sciences (PNAS), 121(3), e2300582121.
- **Guangzhou Medical University (2024):** *Drinking boiled water reduces human intake of nanoplastics and microplastics.* Environmental Science & Technology Letters.
- **Marfella, R., et al. (2024):** *Microplastics and Nanoplastics in Atheromas and Cardiovascular Events.* New England Journal of Medicine, 390(10), 900–910.
- **World Health Organization (2022):** *Dietary and inhalation exposure to nano- and microplastic particles and potential implications for human health.* Geneva: WHO.

