"use client";
import { useEffect } from "react";

function updateVH() {
  const height = window.visualViewport?.height;

  if (!height) {
    return;
  }
  let vh = height * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export const useUpdateVh = () => {
  useEffect(() => {
    window.visualViewport?.addEventListener("resize", updateVH);
    return () => window.visualViewport?.removeEventListener("resize", updateVH);
  }, []);
};
