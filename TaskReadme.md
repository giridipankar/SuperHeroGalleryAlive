# React Native Take-Home Assignment: Smart Hero Gallery (Alive)

Build a smart, horizontally scrollable hero gallery for an experience page. The gallery comes from an API and contains images and videos with diﬀerent aspect raAos. The component must stay smooth for large lists (100+ items).

## What this tests

*   React NaAve UI and layout skills
*   Performance on long, media-heavy lists
*   TypeScript discipline and clean code
*   Robust media loading with fallbacks
*   PracAcal product UX (scroll hint, loading and error states)

## API

Use this endpoint as-is:
`GET https://dev.iamalive.app/api/destinations/experience/learn-horse-riding-and-trot-down-a-private-forest-trail?fields=gallery`

You will use `data.gallery` (array) from the response. Each item includes: `src` (filename), `type` (image or video), `aspectRaAo`, and opAonal `alt`.

## Output to build

Create a screen or component named `SmartHeroGallery` that:

1.  Fetches the gallery from the API.
2.  Builds the gallery into pages using the rules below.
3.  Renders pages in a horizontal, conAnuous scroll.
4.  Loads media using the CDN path rules and fallbacks.
5.  Shows a nudge on the first page to hint there is more content.

### Page layout (fixed)

The gallery is shown as pages. Each page is a fixed 2-column block:

**Column 1 (leJ)**
*   One large Ale (hero Ale).
*   Prefer a video here when possible.

**Column 2 (right)**
*   Two Ales stacked verAcally.
*   Both Ales must have equal height.
*   Prefer images in this column.

### Video rule (updated)

Only one video is allowed per page.
*   The video should preferably be in Column 1. If there are not enough images to fill both stacked Ales in Column 2, then the video may fallback into Column 2 to keep the page complete.

### Media selection rules

1.  **Preserve API order as much as possible**
    *   Keep items in the same order as the API response whenever possible. Reorder only when needed to saAsfy the video preference or to fill the page.
2.  **Video preference is applied from Page 1 onwards**
    For each page, in order (Page 1, then Page 2, and so on):
    *   If videos are available in the remaining list, pick the video whose aspect raAo is closest to 9:16.
    *   This is done page-by-page starAng from Page 1 (not one global pick for the enAre gallery).
    *   Tie breaker: if two videos are equally close, choose the one that appears earlier in the remaining list.
    *   9:16 raAo = 9/16 = 0.5625. Use `abs(video.aspectRaAo - 0.5625)` and choose the smallest value.
3.  **Fill the page**
    Each page must render 3 Ales total: 1 in Column 1 and 2 in Column 2.
    *   Preferred fill order:
        *   Column 1: selected video if available, else an image.
        *   Column 2: two images.
    *   If images are not enough for Column 2, allow the selected video to be placed in Column 2 (sAll only one video on the page).

### Continuous scrolling

Render the pages in a horizontal list. The scroll must be conAnuous and smooth, even with 100+ items. Use snap or paging so the list lands cleanly on a page.

### Smart cover rule (simple)

Media should fill the Ale nicely, with minimal cropping. Aim to crop mainly on one axis (either verAcal or horizontal) as much as possible, not heavily on both. Explain your approach in the README.

### CDN paths (generalised)

You receive only filenames in `src`. Build URLs using these constants:
`CDN_BASE = "https://cdn.iamalive.app"`
`PROCESSED_MOBILE_PREFIX = "/processed/mobile/"`
`PREVIEW_PREFIX = "/processed/preview/"`

**Images**
*   Processed: `CDN_BASE + PROCESSED_MOBILE_PREFIX + src`
*   Original fallback: `CDN_BASE + "/" + src`
*   Preview placeholder: `CDN_BASE + PREVIEW_PREFIX + src`

**Videos**
*   Video file URL:
    *   Processed: `CDN_BASE + PROCESSED_MOBILE_PREFIX + src`
    *   Original fallback: `CDN_BASE + "/" + src`
*   Video thumbnail (poster) filename = `src + ".webp"`
    *   Processed thumbnail: `CDN_BASE + PROCESSED_MOBILE_PREFIX + (src + ".webp")`
    *   Original thumbnail: `CDN_BASE + "/" + (src + ".webp")`
    *   Preview thumbnail: `CDN_BASE + PREVIEW_PREFIX + (src + ".webp")`

### Progressive loading and fallbacks (must do)

**Images**
*   Show preview placeholder first (try to load it; if it fails, skip it).
*   Then load processed mobile image.
*   If processed fails, fallback to original.
*   Do not do HEAD checks for every asset.

**Videos**
*   Keep the video autoplay
*   Always show a poster first: preview thumbnail (if it loads) -> processed thumbnail -> original thumbnail.
*   While the video downloads, keep showing the poster.
*   If processed video fails, fallback to original video.
*   If playback fails, keep the poster and show a `Tap to retry` overlay.

### On-Click/Interaction Behavior
When a user clicks on any item, it should display the image or video in a full-screen modal, similar to a carousel.
*   **Navigation**: Users should be able to navigate to the previous/next item in the carousel.
*   **Content Display**: In full-screen mode, the content should be fully visible without any truncation, unlike the cover view.
*   **Zoom**: On double-clicking or using a pinch gesture, the image should be zoomable.
*   **Video Zoom**: Zoom functionality should not be applied to videos.
*   **Reference**: This behavior is similar to standard gallery apps.

### First page nudge (scroll hint)

*   Show a small nudge buion on the right centre edge of Page 1 only.
*   On press, smoothly scroll to Page 2 (the next page).
*   Hide the nudge ajer the first press or once the user scrolls away from Page 1.

## Performance requirements

The gallery can contain 100+ items. Your soluAon must remain smooth.

*   Use a horizontal `FlatList` (recommended).
*   Memoise Ales/pages to reduce re-renders.
*   Use stable callbacks (avoid unnecessary inline props).
*   Pause or unmount video when its page is not visible.
*   Avoid heavy work in render; keep page building logic outside render.

## Core logic requirement (must do)

Create a determinisAc pure funcAon that builds pages:

```typescript
type GalleryItem = {
  _id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  aspectRatio?: number;
};

type PageLayout = {
  left: GalleryItem;
  rightTop: GalleryItem;
  rightBottom: GalleryItem;
};

function buildPages(items: GalleryItem[], opts?: { lookahead?: number }): PageLayout[]
```

`Lookahead` is opAonal but recommended (example 12). It helps preserve order while picking a good portrait video with minimal movement.

## Extra tasks (pick any 2)

Complete any 2 extras below to show full React NaAve experAse:

*   **Extra 1: Prefetch**
    When the user is on page N, prefetch images for page N+1 (and opAonally N+2). For videos, prefetch only thumbnails (not the full video file).
*   **Extra 2: Viewability control for video**
    Allow video playback only on the current visible page. Pause as soon as the page is not visible (example threshold: 60%).
*   **Extra 3: Unit tests for page building**
    Add tests for `buildPages()`: only images, mulAple videos with diﬀerent aspect raAos, missing aspect raAos, long list behaviour.
*   **Extra 4: Page indicator**
    Add a simple dots indicator that shows current page index.

## Deliverables

*   GitHub repo or zip.
*   README with setup steps.
*   Short explanaAon of `buildPages` logic and how you preserve order.
*   How you handled fallbacks: preview -> processed -> original.
*   What you did for performance (`FlatList` selngs, memo, viewability, etc.).
*   What you would improve with more Ame.

## Acceptance checklist

*   Fetches the API and reads `data.gallery`.
*   Builds pages using the rules above.
*   2-column layout: lej hero + 2 stacked Ales with equal height.
*   Only 1 video per page.
*   Video is placed in Column 1 unless images are not enough, then it may be in Column 2.
*   Closest-to-9:16 video preference is applied page-by-page starAng from Page 1.
*   Horizontal scroll is smooth for large lists.
*   Progressive loading works: preview -> processed -> original.
*   Video shows poster while loading and has a retry fallback.
*   First page nudge scrolls to the next page smoothly.
