export default function manifest() {
  return {
    name: "projekt-kshitij",
    short_name: "Kshitij",
    description: "An open-source article summarizer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0705",
    theme_color: "#0f0705",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      ,
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
