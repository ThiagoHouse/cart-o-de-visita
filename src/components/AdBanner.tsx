"use client";

interface Props {
  adSlot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export default function AdBanner({ format = "horizontal", className = "" }: Props) {
  const sizes: Record<string, string> = {
    horizontal: "h-24 w-full",
    rectangle: "h-60 w-full max-w-sm",
    vertical: "h-[600px] w-40",
  };

  // Em desenvolvimento mostra placeholder; em produção insira o script do AdSense
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm font-medium ${sizes[format]} ${className}`}
      >
        ?? Espaço para Anúncio ({format})
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
