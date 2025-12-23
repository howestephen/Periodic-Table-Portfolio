import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'entering' | 'entered'>('entering');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('entering');
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('entered');
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setTransitionStage('entered');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        transitionStage === 'entering' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
}


