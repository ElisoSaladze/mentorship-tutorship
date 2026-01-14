import { useState, useEffect } from "react";
import { getResource } from "~/api/users/api";

export const useResourceUrl = (resourceId: string | undefined | null) => {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resourceId) {
      setUrl(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    getResource(resourceId)
      .then((blobUrl) => {
        if (isMounted) {
          setUrl(blobUrl);
        }
      })
      .catch(() => {
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
      // Revoke the blob URL when unmounting
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [resourceId]);

  return { url, isLoading };
};
