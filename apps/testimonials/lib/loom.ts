export function toLoomEmbedUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return input;

  // Accept "www.loom.com/..." or "//www.loom.com/..." as well.
  const normalized =
    /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed.replace(/^\/\//, "")}`;

  try {
    const url = new URL(normalized);

    // Only rewrite Loom URLs.
    if (url.hostname !== "www.loom.com" && url.hostname !== "loom.com") {
      return input;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const kind = parts[0];
    const id = parts[1];
    if (!kind || !id) return input;

    if (kind === "share" || kind === "embed") {
      return `https://www.loom.com/embed/${id}`;
    }

    return input;
  } catch {
    // If it's not a valid absolute URL, don't rewrite.
    return input;
  }
}

