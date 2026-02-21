export type GalleryItem = {
    _id: string;
    type: "image" | "video";
    src: string;
    alt?: string;
    aspectRatio?: number;
};

export type PageLayout = {
    left: GalleryItem;
    rightTop: GalleryItem;
    rightBottom: GalleryItem;
};

export type MediaUrls = {
    previewUrl?: string;
    processedUrl: string;
    originalUrl: string;
    poster?: {
        preview: string;
        processed: string;
        original: string;
    };
};