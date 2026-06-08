<div align="center">

# 🧠 fleet-midi-generator

> *Transformer-like MIDI continuation from agent state sequences*

[![CI](https://img.shields.io/github/actions/workflow/status/SuperInstance/fleet-midi-generator/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/SuperInstance/fleet-midi-generator/actions)
[![npm](https://img.shields.io/badge/npm-%40superinstance%2Fmidi--generator-cb3837?style=flat-square&logo=npm)](https://www.npmjs.com/package/@superinstance/midi-generator)
[![Docker](https://img.shields.io/badge/docker-ghcr-2496ed?style=flat-square&logo=docker)](https://github.com/SuperInstance/fleet-midi-generator/pkgs/container/fleet-midi-generator)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](http://makeapullrequest.com)

---

Takes a sequence of ternary agent states and generates a MIDI completion. Each {+1, 0, -1} maps to a pitch contour. Produces Standard MIDI Format 1 files ready for fleet transport. No training — pure zeroshot generation.

---

## 📦 Installation

```bash
# npm
npm install @superinstance/midi-generator

# Docker
docker pull ghcr.io/superinstance/fleet-midi-generator:latest

# Clone
git clone https://github.com/SuperInstance/fleet-midi-generator.git
```

## 🚀 Quick Start

```bash
# Generate MIDI completion from agent states:
node lib/generator.js "[[1,0,-1,1],[0,1,0,-1],[-1,-1,1,1],[1,0,0,1]]"

# Output:
# {"file":"completion-12345.mid","notes":16,"bars":4}
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Agent State Sequences                              │
│   [[1,0,-1,1], [0,1,0,-1], [-1,-1,1,1], [1,0,0,1]]  │
│         │                                           │
│         ▼                                           │
│   ┌─────────────────┐                               │
│   │ Pitch Mapper     │  +1 → base + 4 (ascend)      │
│   │                  │   0 → base (repeat)          │
│   │                  │  -1 → base - 3 (descend)     │
│   └────────┬─────────┘                               │
│            ▼                                        │
│   ┌─────────────────┐                               │
│   │ music21 Score   │  16 notes · 4 bars            │
│   │ MIDI Format 1   │  Output: completion-{hash}.mid│
│   └─────────────────┘                               │
│                                                     │
│   Every ternary state = one quarter note in 4/4      │
│   Auto-detects python3.10 for music21                │
└─────────────────────────────────────────────────────┘
```

## 📡 API

### CLI Usage
```bash
node lib/generator.js "[[1,0,-1,1],[0,1,0,-1]]"
```

### Programmatic
```javascript
const { generateCompletion } = require("./lib/generator");
const result = generateCompletion([[1,0,-1],[0,1,0]], 4);
// → { file: "...mid", notes: 16, bars: 4 }
```

## 🧪 Beta Tested

Part of the [SuperInstance MIDI Fleet](https://github.com/SuperInstance/construct-coordination/blob/main/FLEET_MIDI.md). Every push verified via CI — zeroshot tests ensure zero-config operation out of the box.

## 🤝 Related

- [fleet-bridge](https://github.com/SuperInstance/fleet-bridge) — I2I bottle transport
- [construct-coordination](https://github.com/SuperInstance/construct-coordination) — Fleet catalog

---

<div align="center">
<sub>Built with 🧠 for the SuperInstance fleet • <a href="https://github.com/SuperInstance">github.com/SuperInstance</a></sub>
</div>
