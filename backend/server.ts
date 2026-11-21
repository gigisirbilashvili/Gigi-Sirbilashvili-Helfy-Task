import { createApp } from './app';

const PORT = 4000;

createApp().listen(PORT, () => {
  console.log(`Task API running on http://localhost:${PORT}`);
});
