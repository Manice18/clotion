"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, FileVideo } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();

  const params = useParams();

  const coverImage = useCoverImage();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        useMemo(() => {
          const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
          return isVideo ? (
            <video src={url} className="h-full w-full object-cover" controls={preview} autoPlay={preview} loop={preview} muted={preview} />
          ) : (
            <Image src={url} fill alt="Cover Image" className="object-cover" />
          );
        }, [url, preview])
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            {url.match(/\.(mp4|webm|ogg)$/i) ? (
              <FileVideo className="mr-2 h-4 w-4" />
            ) : (
              <ImageIcon className="mr-2 h-4 w-4" />
            )}
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};

export default Cover;
