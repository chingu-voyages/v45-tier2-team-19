import { useState, useCallback } from "react";
import _debounce from "lodash.debounce";

export const useTooltip = () => {
  const [tooltipData, setTooltipData] = useState(null);

  const handleMouseMoveInstant = useCallback((e, d) => {
    const toolTipPosition = {
      reclat: d.reclat,
      reclong: d.reclong,
      name: d.name,
      mass: d["mass (g)"],
      state: d.state,
      country: d.country,
      x: e.clientX,
      y: e.clientY,
    };

    setTooltipData(toolTipPosition);
  }, []);

  const handleMouseOut = useCallback(() => {
    setTooltipData(null);
  }, []);

  const debouncedHandleMouseOver = useCallback((e, d) => {
    _debounce(handleMouseMoveInstant(e, d), 200);
  }, []);

  return {
    tooltipData,
    debouncedHandleMouseOver,
    handleMouseOut,
  };
};
