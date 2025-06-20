import { useEffect, useState } from "react";

const useLoadImg = () => {
  const [load, setLoad] = useState<number>(0);
  useEffect(() => {
    if (load >= 100) return;
    const interval = setInterval(() => {
      setLoad((prevLoad) => prevLoad + 1);
    }, 30);
    return () => clearInterval(interval);
  }, [load]);

  
  return { load };
};

export default useLoadImg;
