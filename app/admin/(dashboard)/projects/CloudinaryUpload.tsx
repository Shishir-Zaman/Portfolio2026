"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryUpload({ value, onChange, label = "Upload Image" }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Get signature from our secure API
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        timestamp,
        folder: "portfolio-projects",
      };

      const sigRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paramsToSign }),
      });
      
      const { signature, apiKey, cloudName } = await sigRes.json();
      if (!signature) throw new Error("Failed to get signature");

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "portfolio-projects");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (uploadData.secure_url) {
        onChange(uploadData.secure_url);
      } else {
        throw new Error(uploadData.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Ensure Cloudinary env vars are set.");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-white/40 uppercase tracking-widest">{label}</label>
      <div
        className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors border-white/20 bg-black/40 hover:border-white/40 hover:bg-white/5`}
      >
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onDrop(Array.from(e.target.files));
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        
        {value ? (
          <Image src={value} alt="Preview" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" unoptimized />
        ) : null}

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity z-10 text-center p-4 pointer-events-none">
          {uploading ? (
            <Loader2 className="animate-spin text-[var(--color-teal-accent)] mb-2" size={32} />
          ) : (
            <>
              <UploadCloud className="text-[var(--color-teal-accent)] mb-2" size={32} />
              <p className="text-sm font-bold text-white">Click to upload</p>
              <p className="text-xs text-white/50 mt-1">Supports JPG, PNG, WEBP</p>
            </>
          )}
        </div>
        
        {/* Always show icon if no image */}
        {!value && !uploading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <UploadCloud className="text-white/20 mb-2" size={32} />
              <p className="text-sm text-white/40 font-sans">Upload Image</p>
           </div>
        )}
      </div>
    </div>
  );
}
