import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState({
    index: "",
    status: false,
  });

  const toggle = (key, status) => {
    setLoading({ index: key, status: status });
  };

  return { toggle, loading };
};

export default useLoading;
