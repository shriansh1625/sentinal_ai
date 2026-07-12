/**
 * Browser runtime abstraction — PART_10 / PART_11.
 * Call sites depend on this interface, not raw chrome.* (testability).
 */

export interface BrowserRuntime {
  getManifestVersion(): string;
  getId(): string;
  openOptionsPage(): Promise<void>;
}

export class ChromeBrowserRuntime implements BrowserRuntime {
  getManifestVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  getId(): string {
    return chrome.runtime.id;
  }

  async openOptionsPage(): Promise<void> {
    await chrome.runtime.openOptionsPage();
  }
}

export class FakeBrowserRuntime implements BrowserRuntime {
  constructor(
    private readonly version = '0.1.0',
    private readonly id = 'sentinel-shield-test',
  ) {}

  getManifestVersion(): string {
    return this.version;
  }

  getId(): string {
    return this.id;
  }

  openOptionsPage(): Promise<void> {
    return Promise.resolve();
  }
}
