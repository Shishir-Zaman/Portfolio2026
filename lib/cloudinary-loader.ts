export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  // If the src is already a full Cloudinary URL, we can inject our params
  if (src.includes("res.cloudinary.com")) {
    // Cloudinary URLs typically look like:
    // https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<version>/<public_id>
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      // Remove any existing transformations (they are usually between upload/ and the version/public_id)
      // A typical version starts with 'v' followed by numbers, e.g., v1778827490
      const afterUpload = parts[1];
      const segments = afterUpload.split("/");
      
      // Find the segment that looks like a version (v + numbers) or just take the end
      let versionIndex = -1;
      for (let i = 0; i < segments.length; i++) {
        if (/^v\d+$/.test(segments[i])) {
          versionIndex = i;
          break;
        }
      }

      let publicIdAndVersion = "";
      if (versionIndex !== -1) {
        publicIdAndVersion = segments.slice(versionIndex).join("/");
      } else {
        // If no version is found, assume the last segment is the public ID
        // or just take everything if no transformations were present
        if (segments.length > 1 && segments[0].includes("_")) {
          // It's likely a transformation string
          publicIdAndVersion = segments.slice(1).join("/");
        } else {
          publicIdAndVersion = afterUpload;
        }
      }

      return `${parts[0]}/upload/${params.join(",")}/${publicIdAndVersion}`;
    }
  }

  // If it's a relative path or unparseable Cloudinary URL, return as is (or handle differently)
  // We'll return it directly since next.config.js might just pass it through.
  return src;
}
