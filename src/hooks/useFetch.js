import { useEffect, useState } from "react";

/**
 * Unified hook for fetching data that manages loading/error/data states automatically
 *
 * @param {Function} fetcher - async function that returns the data (e.g. getProductById(id))
 * @param {Array} deps - dependency array (e.g. [id]) that refetches data when changed
 * @param {boolean} skip - if true, the request won't run (useful when there's no query yet)
 */
export default function useFetch(fetcher, deps = [], skip = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (skip) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!isCancelled) setData(result);
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("useFetch error:", err);
          setError(err);
        }
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    // Prevent state updates if the component unmounts before the request finishes
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
