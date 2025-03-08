import { useCallback, useRef } from "react";

export enum ReaderContentType {
  URL = "URL",
  Text = "Text",
}

export function useUploadFile(
  readerContentType: ReaderContentType
): (file: File) => Promise<string | ArrayBuffer | null> {
  const reader = useRef(new FileReader());

  const uploadFile = useCallback((file: File) => {
    const promise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      reader.current.onload = (e): void => {
        if (!e.target) return;

        resolve(e.target.result);
      };

      reader.current.onerror = reject;
    });

    if (readerContentType === ReaderContentType.URL) {
      reader.current.readAsDataURL(file);
    }

    if (readerContentType === ReaderContentType.Text) {
      reader.current.readAsText(file);
    }

    return promise;
  }, []);

  return uploadFile;
}
