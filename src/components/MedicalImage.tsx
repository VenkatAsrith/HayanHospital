"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Building2, Stethoscope, HeartPulse, User } from "lucide-react";

interface MedicalImageProps extends Omit<ImageProps, "onError"> {
  fallbackType?: "hospital" | "doctor" | "pediatric" | "surgery";
}

export default function MedicalImage({
  src,
  alt,
  fallbackType = "hospital",
  className,
  ...props
}: MedicalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const FallbackIcon =
      fallbackType === "doctor"
        ? User
        : fallbackType === "pediatric"
        ? HeartPulse
        : fallbackType === "surgery"
        ? Stethoscope
        : Building2;

    return (
      <div className={`w-full h-full min-h-[140px] bg-gradient-to-br from-[#F7F8F6] to-[#EAF5F9] flex flex-col items-center justify-center p-4 text-[#164B61] ${className || ""}`}>
        <FallbackIcon className="w-10 h-10 stroke-[1.25] text-[#164B61]/60 mb-2" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#626262] text-center line-clamp-2">
          {alt || "Hayan Hospital Clinical Image"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
