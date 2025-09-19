import { useState, useEffect } from 'react';

export function useCarousel(totalItems: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to first item when total items change
  useEffect(() => {
    setCurrentIndex(0);
  }, [totalItems]);

  // Ensure index stays within bounds
  const safeCurrentIndex = Math.min(currentIndex, Math.max(0, totalItems - 1));

  const goToNext = () => {
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const goToPrevious = () => {
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  };

  const canGoNext = totalItems > 1 && safeCurrentIndex < totalItems - 1;
  const canGoPrevious = totalItems > 1 && safeCurrentIndex > 0;

  return {
    currentIndex: safeCurrentIndex,
    goToNext,
    goToPrevious,
    goToIndex,
    canGoNext,
    canGoPrevious,
    hasMultipleItems: totalItems > 1
  };
}
