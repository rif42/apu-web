interface AstroImageModule {
  src: string;
  width: number;
  height: number;
  format: string;
}

const modules = import.meta.glob<AstroImageModule>(
  [
    '/src/assets/images/**/*.{jpg,jpeg,png,webp,svg,gif,avif}',
    '/src/assets/mapsection/**/*.{jpg,jpeg,png,webp,svg,gif,avif}',
    '/src/assets/reference/**/*.{jpg,jpeg,png,webp,svg,gif,avif}',
  ],
  { eager: true, import: 'default' }
);

const urlByPath = new Map<string, string>();

function register(path: string, mod: AstroImageModule) {
  const url = mod.src;
  urlByPath.set(path, url);

  // Legacy public-style aliases.
  if (path.startsWith('/src/assets/images/')) {
    urlByPath.set(path.replace('/src/assets/images/', '/images/'), url);
  }
  if (path.startsWith('/src/assets/mapsection/')) {
    urlByPath.set(path.replace('/src/assets/mapsection/', '/mapsection/'), url);
  }
  if (path.startsWith('/src/assets/reference/')) {
    urlByPath.set(path.replace('/src/assets/reference/', '/reference/'), url);
  }

  // Basename fallback for simple lookups.
  const basename = path.split('/').pop();
  if (basename && !urlByPath.has(basename)) {
    urlByPath.set(basename, url);
  }
}

for (const [path, mod] of Object.entries(modules)) {
  register(path, mod);
}

export function assetUrl(path: string): string {
  if (urlByPath.has(path)) return urlByPath.get(path)!;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (urlByPath.has(normalized)) return urlByPath.get(normalized)!;

  // Fallback to the original path so missing assets do not break the build.
  // The caller should add the missing file to src/assets/images.
  if (import.meta.env.DEV) {
    console.warn(`[assetUrl] missing asset: ${path}`);
  }
  return path;
}
