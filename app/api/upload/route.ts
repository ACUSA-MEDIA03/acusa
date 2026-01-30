import cloudinary from "@/lib/cloudinary-server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json(); // receive base64 or URL
    const { file } = data;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: "official_letters", // optional folder
      resource_type: "auto", // allows image, video, or audio
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
