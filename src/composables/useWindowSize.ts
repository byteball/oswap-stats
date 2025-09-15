import { type Ref, onMounted, onUnmounted, reactive, toRefs } from "vue";

interface WindowSize {
  x: Ref<number>;
  y: Ref<number>;
}

export function useWindowSize(): WindowSize {
  const windowSize = reactive({ x: 0, y: 0 });
  const resizeListener = () => {
    ({ innerWidth: windowSize.x, innerHeight: windowSize.y } = window);
  };
  onMounted(() => window.addEventListener("resize", resizeListener));
  onUnmounted(() => window.removeEventListener("resize", resizeListener));
  resizeListener();
  return toRefs(windowSize);
}

export default useWindowSize;
