import { useCallback, useRef } from "react";

export function useUploadFile(): (file: File) => Promise<string | ArrayBuffer | null> {
  const reader = useRef(new FileReader());

  const uploadFile = useCallback((file: File) => {
    const promise = new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      reader.current.onload = (e): void => {
        if (!e.target) return;

        resolve(e.target.result);
      };

      reader.current.onerror = reject;
    });

    reader.current.readAsDataURL(file);

    return promise;
  }, []);

  return uploadFile;
}
