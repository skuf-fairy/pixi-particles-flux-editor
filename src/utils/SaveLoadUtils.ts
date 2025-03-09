export enum ReaderContentType {
  URL = "URL",
  Text = "Text",
}

export class SaveLoadUtils {
  public static downloadJSON(jsonString: string, name: string): void {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public static uploadFile(file: File, readerContentType: ReaderContentType): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader();

    const promise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      reader.onload = (e): void => {
        if (!e.target) return;

        resolve(e.target.result);
      };

      reader.onerror = reject;
    });

    if (readerContentType === ReaderContentType.URL) {
      reader.readAsDataURL(file);
    }

    if (readerContentType === ReaderContentType.Text) {
      reader.readAsText(file);
    }

    return promise;
  }
}
