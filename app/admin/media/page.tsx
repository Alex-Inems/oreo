"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary-client";
import { UploadCloud, Copy, CheckCircle, Image as ImageIcon, Loader2 } from "lucide-react";

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ url: string; time: number }[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setUploading(true);
    try {
      const newImages: { url: string; time: number }[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i]);
        newImages.push({ url, time: Date.now() });
      }
      setImages(prev => [...newImages, ...prev]);
    } catch (err) {
      alert("Failed to upload image. Please ensure your Cloudinary credentials are set up in .env.local.");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8 min-h-[90vh] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Media Library</h1>
          <p className="text-zinc-500 text-sm mt-1">Upload images to generate URLs for custom pages or content blocks.</p>
        </div>
      </div>

      <div className="relative group rounded-[2rem] border-2 border-dashed border-white/10 bg-[#111] hover:bg-white/5 hover:border-red-500/50 transition-all duration-300 p-12 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden shadow-xl">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm">Uploading Assets...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 group-hover:-translate-y-2 transition-transform duration-500">
            <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-all group-hover:scale-110">
               <UploadCloud className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-1">
               <p className="text-white font-bold text-lg tracking-wide">Drag & Drop or Click to Upload</p>
               <p className="text-zinc-500 text-sm">Supports JPG, PNG, WEBP, GIF (Uploads directly to Cloudinary)</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
         {images.length > 0 && (
           <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-6 border-b border-white/5 pb-2">Recent Session Uploads</h2>
         )}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {images.map((img, i) => (
             <div key={i} className="group relative aspect-square rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl">
                <img src={img.url} alt={`Upload ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                   <button 
                      onClick={() => copyUrl(img.url, i)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all w-full justify-center"
                   >
                     {copied === i ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                     {copied === i ? "Copied!" : "Copy URL"}
                   </button>
                </div>
             </div>
           ))}
         </div>
         {images.length === 0 && !uploading && (
           <div className="flex flex-col items-center justify-center h-40 text-center space-y-3 opacity-50">
              <ImageIcon className="w-10 h-10 text-zinc-700" />
              <p className="text-zinc-500 text-sm tracking-widest uppercase">No media uploaded in this session.</p>
           </div>
         )}
      </div>
    </div>
  );
}
