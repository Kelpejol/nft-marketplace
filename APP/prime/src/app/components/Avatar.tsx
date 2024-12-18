"use client";

import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <Image
      className="rounded-full"
      height={33}
      src={ "/placeholder.png"}
      width={33}
      alt="Avatar"
    />
  );
}
