import { useState, useRef, useEffect } from "react";
import { getResource } from "~/api/users/api";

export const useResourceUrl = (resourceId: string | undefined | null) => {
  const [url, setUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!resourceId) {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
      setUrl(null);
      setContentType(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }

    getResource(resourceId)
      .then(({ url, contentType }) => {
        if (isMounted) {
          urlRef.current = url;
          setUrl(url);
          setContentType(contentType);
        } else {
          URL.revokeObjectURL(url);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUrl(null);
          setContentType(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resourceId]);

  useEffect(() => {
    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, []);

  return { url, contentType, isLoading };
};
