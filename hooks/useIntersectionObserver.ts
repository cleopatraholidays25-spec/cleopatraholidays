import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

/**
 * A custom hook that uses the Intersection Observer API to detect when an element is visible in the viewport.
 * @param ref - A React ref object attached to the element to observe.
 * @param options - Configuration for the Intersection Observer.
 * @returns The IntersectionObserverEntry for the observed element, or undefined if not yet available.
 */
export const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;

    if (!element || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        if (entry.isIntersecting && triggerOnce) {
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return entry;
};
