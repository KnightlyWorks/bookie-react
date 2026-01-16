import { useVirtualizer } from "@tanstack/react-virtual";
import { useMediaQuery } from "react-responsive";
import { tailwindBreakpoints } from "@constants/tailwindBreakpoints";

export function useBookGridVirtualizer({ items, parentRef, estimateSize = 400 }) {
  const isMobile = useMediaQuery({ maxWidth: tailwindBreakpoints.md - 1 });
  const isTablet = useMediaQuery({ maxWidth: tailwindBreakpoints.lg - 1 });

  const columns = isMobile ? 1 : isTablet ? 2 : 4;

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / columns),
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 2,
  });

  return { rowVirtualizer, columns };
}
