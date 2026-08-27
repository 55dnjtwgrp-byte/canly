const BACKUP_KEYS = ["canly:ratings", "canly:favorites", "canly:profile", "canly:pins"];

interface Backup {
  version: 1;
  exportedAt: string;
  data: Record<string, unknown>;
}

export function exportBackup(): void {
  const data: Record<string, unknown> = {};
  for (const key of BACKUP_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw === null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      // skip a corrupted entry rather than fail the whole export
    }
  }

  const backup: Backup = { version: 1, exportedAt: new Date().toISOString(), data };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `canly-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const text = await file.text();
  const parsed = JSON.parse(text) as Partial<Backup>;
  if (!parsed || typeof parsed !== "object" || typeof parsed.data !== "object" || parsed.data === null) {
    throw new Error("Not a valid Canly backup file");
  }
  for (const key of BACKUP_KEYS) {
    if (key in parsed.data) {
      localStorage.setItem(key, JSON.stringify(parsed.data[key]));
    }
  }
}
