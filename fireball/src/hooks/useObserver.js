import { useEffect, useRef, useState } from "react";

function useObserver(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

export default useObserver;

// USAGE:

{
  /* function MyComponent() {
  const [targetRef, isIntersecting] = useObserver({
    rootMargin: "-2px",
    // Add other options as needed
  });

  return (
    <div ref={targetRef}>
      {isIntersecting && (
        // Content to render when the observed element is in the viewport
        <div>Your content here</div>
      )}
    </div>
  );
}*/
}
