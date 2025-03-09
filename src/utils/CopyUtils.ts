export class CopyUtils {
  public static async copyTextToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
  }
}
