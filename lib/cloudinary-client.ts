"use client";

// ─── Cloudinary Config ──────────────────────────────────────────────────────────
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drmklv0lh";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "blogme";

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file",          file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name",    CLOUD_NAME);
    formData.append("folder",        "cars26_inventory");

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body:   formData,
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Cloudinary: Upload failed");
        }

        const data = await response.json();
        return data.secure_url;
    } catch (err) {
        console.error("Cloudinary: Failed to upload image", err);
        throw err;
    }
}
