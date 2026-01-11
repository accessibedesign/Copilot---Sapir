import { useKeyPress } from "./index";
import { fireEvent, renderHook } from "@testing-library/preact";

describe("Tests `useKeyPress` hook functionality", () => {
  it(`should return true if the specified key is pressed`, async () => {
    const { result } = renderHook(() => useKeyPress({ targetKey: "Escape" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(result.current).toBe(true);
  });
  it(`should return false if a different key is pressed`, async () => {
    const { result } = renderHook(() => useKeyPress({ targetKey: "Escape" }));
    fireEvent.keyDown(document, { key: "Enter" });
    expect(result.current).toBe(false);
  });
  it(`should return true if the specified key is pressed and false when it's released`, async () => {
    const { result } = renderHook(() => useKeyPress({ targetKey: "Escape" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(result.current).toBe(true);
    fireEvent.keyUp(document, { key: "Escape" });
    expect(result.current).toBe(false);
  });

  it(`shoud return false if the different key than the one specified is pressed`, async () => {
    const { result } = renderHook(() => useKeyPress({ targetKey: "Escape" }));
    fireEvent.keyDown(document, { key: "Tab" });
    expect(result.current).toBe(false);
    fireEvent.keyUp(document, { key: "Tab" });
    expect(result.current).toBe(false);
  });
});
