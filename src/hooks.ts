import { useState } from 'react';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = (value: boolean) => setIsShowing(value);

  return {
    isShowing,
    toggle,
  }
};
