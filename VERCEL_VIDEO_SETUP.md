# Vercel video setup

The project no longer depends on Lovable's internal asset URLs or `.mp4.asset.json` files.

Put the MP4 files in `public/videos/` using these names:
`p1.mp4`, `p2.mp4`, ... `p24.mp4`.

The application will request them as `/videos/p1.mp4`, etc.
For large video collections, use object storage/CDN instead of committing large MP4s to Git.
