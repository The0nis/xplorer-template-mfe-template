# Xplorer - Microfrontend Monorepo

This project uses **npm workspaces** to manage multiple microfrontends (MFEs) in a single monorepo, enabling independent deployment and live-reloading of each microfrontend.

## Project Structure
The project consists of several microfrontends (MFEs) in the `workspaces`:
- `component`
- `auth`
- `customers`
- `dashboard`
- `cases`
- `activities`
- `request`
- `knowledgearticle`
- `services`
- `ccms`
- `usermanagement`
- `casestructure`
- `gensettings`
- `container`

## Setup

### Prerequisites
- Node.js (LTS version)
- npm

### Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd xplorer
npm run install:deps
```

## Available Scripts

### Install Dependencies
To install dependencies for all workspaces at once:
```bash
npm run install:deps
```

### Build All Microfrontends
To build all microfrontends simultaneously:
```bash
npm run build:all
```

### Clean All Microfrontends
To clean build artifacts across all workspaces:
```bash
npm run clean
```

### Start All Microfrontends
This command runs all microfrontends at once, deploying them simultaneously:
```bash
npm run start
```

### Watch and Deploy Specific Microfrontend
To watch and deploy changes for a specific microfrontend, use the following command. Replace `<workspace-name>` with the name of the microfrontend (e.g., `component`, `auth`):
```bash
npm run watch:<workspace-name>
```
Example for `component`:
```bash
npm run watch:component
```

For local development:
```bash
npm run watch:component.local
```

### Watch All Microfrontends
To watch and deploy changes across all microfrontends simultaneously:
```bash
npm run watch:all
```

For local development:
```bash
npm run watch:all.local
```

### Deploy a Specific Microfrontend
To deploy a specific microfrontend without watching for changes:
```bash
npm --workspace <workspace-name> run deploy
```
Example:
```bash
npm --workspace component run deploy
```

## Development Flow

1. Edit files in the `src` folder of any microfrontend.
2. Use `npm run watch:<workspace-name>` to watch for changes and deploy automatically.
3. Use `npm run watch:all` to watch all MFEs at once.
4. Once ready, deploy using `npm --workspace <workspace-name> run deploy`.

## Conclusion
This setup allows for the independent development and deployment of each microfrontend, making the development process faster and more modular.

## KILL PORT - To kill all ports
kill-port --port 4007,5007,4012,4001,4000,9000,4002,4003,4004,4005,4006,5001,5002,5003,5005,5006,4014,4013,4015