# Screenshare Web Client

A real-time screen sharing web application built with Agora SDK for personal use with friends.

## Prerequisites

- Node.js/npm
- An Agora account with an App ID
- A WebSocket server for signaling (see [screenshare-websocket-server](https://github.com/weitongh/screenshare-websocket-server))

## Setup

1. Install dependencies
```bash
npm install
```
2. Create a `.env` file at the project root:
```env
VITE_AGORA_APP_ID=<agora-app-id>
VITE_WS_URL=<websocket-server-url>
VITE_DEFAULT_ROOM_ID=<default-room-id>
```

## Usage

Start the development server:
```bash
npm run dev
```
Build for production:
```bash
npm run build
```
Deploy to Cloudflare Workers:
```bash
npm run deploy
```
