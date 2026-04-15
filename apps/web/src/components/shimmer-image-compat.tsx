"use client";

import { createElement } from "react";
import type { ComponentType, ReactNode } from "react";
import { Image as ShimmerImage } from "react-shimmer";

type ShimmerImageCompatProps = {
  src: string;
  fadeIn?: boolean;
  fallback?: ReactNode;
  NativeImgProps?: {
    alt: string;
  };
};

export default function ShimmerImageCompat(props: ShimmerImageCompatProps) {
  return createElement(
    ShimmerImage as unknown as ComponentType<ShimmerImageCompatProps>,
    props,
  );
}