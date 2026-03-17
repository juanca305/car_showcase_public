// components/CarMainImagePreview.tsx
import Image from "next/image";

interface Props {
  url?: string;
  title: string;
}

export default function CarMainImagePreview({ url, title }: Props) {
  return (
    <div className="sticky top-[96px]">
      <div className="
        rounded-2xl
        overflow-hidden
        border border-luxury-border
        bg-black/20
      ">
        {url ? (
          <Image
            src={url}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-auto"
          />
        ) : (
          <div className="aspect-[4/3] flex items-center justify-center text-sm text-luxury-muted">
            No image
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-luxury-muted text-center">
        Main image (read-only)
      </p>
    </div>
  );
}
