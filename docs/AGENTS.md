# Project Context

This document provides context for AI agents working on the Chromamancer project.

## Overview

Chromamancer is a tool for transmuting VS Code themes to Obsidian and Obsidian themes to VS Code.

## Architecture

The project is organized as a monorepo with the following structure:

- **packages/core**: Shared conversion logic (brand-agnostic)
- **packages/cli**: CLI with brand-specific text
- **packages/vscode-extension**: Extension with brand-specific UI
- **packages/web**: Web app with brand-specific design

## Brand Identity

The brand identity is defined in the `brand/chromamancer/` directory, which includes:
- Voice and tone guidelines
- Logo assets
- Color palette

## Technical Documentation

See `MAPPINGS.md` for technical color mapping details.
