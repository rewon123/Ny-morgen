"use client";

import React, { Suspense } from "react";
import ProductDetailspage from "@/components/ProductDetailsPage/ProductDetailspage";
import { useSearchParams } from "next/navigation";

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const color = searchParams.get("color");

  return (
    <>
      <ProductDetailspage id={id} color={color} />
    </>
  );
}

export default function ProductDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductDetailsContent />
    </Suspense>
  );
}
