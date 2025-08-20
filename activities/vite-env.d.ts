/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_ENCRYPTION_KEY: string;
  readonly VITE_ENCRYPTION_IV: string;
  readonly VITE_EDITOR_KEY: string;
  // Add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
