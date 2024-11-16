// IntersectionObserverComponent.jsx
import { useRef, useEffect } from "react";

const IntersectionObserverComponent = ({ listings }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview-animate-show");
        } else {
          entry.target.classList.remove("inview-animate-show");
        }
      });
    };

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
      });
    }

    const observer = observerRef.current;
    const hiddenElements = document.querySelectorAll(".inview-animate-hide");
    hiddenElements.forEach((element) => observer.observe(element));

    return () => {
      if (observer) {
        hiddenElements.forEach((element) => observer.unobserve(element));
      }
    };
  }, [listings]);

  return null;
};

export default IntersectionObserverComponent;
