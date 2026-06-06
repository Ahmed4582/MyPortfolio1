import { useEffect, useState } from "react";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const useJsonData = (path) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const controller = new AbortController();

    setState({ data: [], loading: true, error: null });

    fetch(path, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${path}`);
        }
        return response.json();
      })
      .then((parsedJSON) => {
        setState({ data: parsedJSON, loading: false, error: null });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setState({ data: [], loading: false, error: error.message });
      });

    return () => controller.abort();
  }, [path]);

  return state;
};

export default useJsonData;
