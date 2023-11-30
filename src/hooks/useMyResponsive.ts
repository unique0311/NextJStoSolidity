import { useResponsive } from "ahooks/es";

import { useEffect, useRef, useState } from "react";

type ResponsiveInfo = Record<string, boolean>;
export const useMyResponsive = () => {
  const responsive_ = useResponsive();
  const [responsive, setResponsive] = useState<ResponsiveInfo>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
  });

  useEffect(() => {
    setResponsive(responsive_);
  }, []);
  return responsive;
};
