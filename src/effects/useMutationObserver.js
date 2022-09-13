export default function useObserver(targetEl, observerHandler, userConfig) {
  const observer = new MutationObserver(observerHandler);
  const config = userConfig || { subtree: true, childList: true };

  return {
    startObserve() {
      observer.observe(targetEl, config);
    },
    stopObserve() {
      observer.disconnect();
    }
  };
}
