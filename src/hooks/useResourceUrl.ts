import { useState, useEffect, useRef } from "react";
import { getResource } from "~/api/users/api";

export const useResourceUrl = (resourceId: string | undefined | null) => {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!resourceId) {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
      setUrl(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    // Revoke previous URL before fetching new one
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }

    getResource(resourceId)
      .then((blobUrl) => {
        if (isMounted) {
          urlRef.current = blobUrl;
          setUrl(blobUrl);
        } else {
          URL.revokeObjectURL(blobUrl);
        }
      })
      .catch((err) => {
        console.error("Failed to load resource:", resourceId, err);
        if (isMounted) {
          setUrl(null);
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

  // Revoke on unmount
  useEffect(() => {
    return () => {
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, []);

  return { url, isLoading };
};
