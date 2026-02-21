import { CDN_BASE, PREVIEW_PREFIX, PROCESSED_MOBILE_PREFIX } from "../api/ApiUrls";
import { GalleryItem, MediaUrls, PageLayout } from "../types/gellery.types";

const buildCdnUrls = (item: GalleryItem): MediaUrls => {
    const processedUrl = `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${item.src}`;
    const originalUrl = `${CDN_BASE}/${item.src}`;
    const previewUrl = `${CDN_BASE}${PREVIEW_PREFIX}${item.src}`;

    if (item.type === "image") {
        return {
            previewUrl,
            processedUrl,
            originalUrl,
        };
    }

    // video
    const posterFile = `${item.src}.webp`;

    return {
        processedUrl,
        originalUrl,
        poster: {
            preview: `${CDN_BASE}${PREVIEW_PREFIX}${posterFile}`,
            processed: `${CDN_BASE}${PROCESSED_MOBILE_PREFIX}${posterFile}`,
            original: `${CDN_BASE}/${posterFile}`,
        },
    };
};

export const GalleryBuilder = (
    DUMMY_DATA: GalleryItem[],
    lookahead: number = 12
) => {
    const pages: any[] = [];
    const remainingItems = [...DUMMY_DATA];

    while (remainingItems.length >= 3) {
        let leftItem: any;
        let rightTopItem: any;
        let rightBottomItem: any;

        /**
         * STEP 1: pick best video (within lookahead)
         */
        const lookaheadItems = remainingItems.slice(0, lookahead);
        const videos = lookaheadItems.filter(
            (i) => i.type === "video" && typeof i.aspectRatio === "number"
        );

        if (videos.length > 0) {
            let best = videos[0];
            let bestDiff = Math.abs(best.aspectRatio! - 0.5625);

            for (let i = 1; i < videos.length; i++) {
                const diff = Math.abs(videos[i].aspectRatio! - 0.5625);
                if (diff < bestDiff) {
                    best = videos[i];
                    bestDiff = diff;
                }
            }

            const idx = remainingItems.findIndex((i) => i._id === best._id);
            remainingItems.splice(idx, 1);

            leftItem = {
                ...best,
                cdn: buildCdnUrls(best),
            };
        }

        /**
         * STEP 2: fill right column with images
         */
        for (let i = 0; i < remainingItems.length; i++) {
            const item = remainingItems[i];

            if (item.type === "image" && !rightTopItem) {
                rightTopItem = {
                    ...item,
                    cdn: buildCdnUrls(item),
                };
                remainingItems.splice(i, 1);
                i--;
            } else if (item.type === "image" && !rightBottomItem) {
                rightBottomItem = {
                    ...item,
                    cdn: buildCdnUrls(item),
                };
                remainingItems.splice(i, 1);
                break;
            }
        }

        /**
         * STEP 3: fallback for left item
         */
        if (!leftItem) {
            const idx = remainingItems.findIndex((i) => i.type === "image");
            if (idx === -1) break;

            const img = remainingItems[idx];
            remainingItems.splice(idx, 1);

            leftItem = {
                ...img,
                cdn: buildCdnUrls(img),
            };
        }

        /**
         * STEP 4: ensure right column completeness
         */
        if (!rightTopItem || !rightBottomItem) {
            if (leftItem.type === "video") {
                if (!rightTopItem) rightTopItem = leftItem;
                else rightBottomItem = leftItem;

                const idx = remainingItems.findIndex((i) => i.type === "image");
                if (idx === -1) break;

                const img = remainingItems[idx];
                remainingItems.splice(idx, 1);

                leftItem = {
                    ...img,
                    cdn: buildCdnUrls(img),
                };
            }
        }

        if (!leftItem || !rightTopItem || !rightBottomItem) break;

        pages.push({
            leftItem,
            rightTopItem,
            rightBottomItem,
        });
    }

    return pages;
};