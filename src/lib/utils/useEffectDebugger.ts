/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const usePrevious = (
  value: DependencyList,
  initialValue: readonly unknown[]
) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useEffectDebugger = (
  effectHook: EffectCallback,
  dependencies: DependencyList,
  dependencyNames?: string[]
) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce(
    (accum: any, dependency: any, index: number) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames?.[index] ?? index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {}
  );

  if (Object.keys(changedDeps as object).length) {
    console.log("[use-effect-debugger] ", changedDeps);
  }

  useEffect(effectHook, [effectHook, ...dependencies]);
};
//https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire
/** Useage
 * useEffectDebug(func, [deps], [dependencies_names]) //변화한 대상이 이름으로 나타남
 * useEffectDebug(func, [deps]); // 변화가 index로 나타남.
 */
