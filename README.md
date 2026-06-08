<div align="center">

# 🧠 fleet-midi-generator

> *Transformer-like MIDI continuation from agent state sequences*

[![CI](https://img.shields.io/github/actions/workflow/status/SuperInstance/fleet-midi-generator/ci.yml?style=flat-square&logo=github&label=CI)](https://github.com/SuperInstance/fleet-midi-generator/actions)
[![npm](https://img.shields.io/badge/npm-%40superinstance%2Fmidi--generator-cb3837?style=flat-square&logo=npm)](https://www.npmjs.com/package/@superinstance/midi-generator)
[![Docker](https://img.shields.io/badge/docker-ghcr-2496ed?style=flat-square&logo=docker)](https://github.com/SuperInstance/fleet-midi-generator/pkgs/container/fleet-midi-generator)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](http://makeapullrequest.com)

---

Takes a sequence of ternary agent states and generates a MIDI completion. Each {+1, 0, -1} maps to a pitch contour (up/repeat/down). Produces Standard MIDI Format 1 files ready for fleet transport. No training required — zeroshot generation from any state pattern.

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
# see Getting Started below
```

## 🏗️ Architecture

```
Coming soon
```

## 📡 API

See source code for endpoints.

## 🧪 Beta Tested

Part of the [SuperInstance MIDI Fleet](https://github.com/SuperInstance/construct-coordination/blob/main/FLEET_MIDI.md). Zeroshot-verified on every push via CI.

## 🤝 Related

- [fleet-bridge](https://github.com/SuperInstance/fleet-bridge) — I2I bottle transport
- [construct-coordination](https://github.com/SuperInstance/construct-coordination) — Fleet catalog

---

<div align="center">
<sub>Built with 🧠 for the SuperInstance fleet • <a href="https://github.com/SuperInstance">github.com/SuperInstance</a></sub>
</div>
