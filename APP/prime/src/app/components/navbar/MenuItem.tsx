"use client";
import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export default function MenuItem({ onClick, label }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 bg-neutral-100 hover:bg-neutral-50 transition font-semibold"
    >
      {label}
    </div>
  );
}
