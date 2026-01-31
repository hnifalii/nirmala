export const uploadImageToCloudinary = async (localUri: string) => {
  const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;

  console.log("Preparing Cloudinary Upload:", {
    cloudName: cloudName ? "Present" : "Missing",
    uploadPreset: uploadPreset ? "Present" : "Missing",
    localUri,
  });

  try {
    const formData = new FormData();

    formData.append("file", {
      uri: localUri,
      type: "image/jpeg",
      name: `scavenger_${Date.now()}.jpg`,
    } as any);

    formData.append("upload_preset", uploadPreset as string);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log("Cloudinary Response Status:", response.status);
    console.log("Cloudinary Response Body:", responseText);

    if (!response.ok) {
        throw new Error(`Cloudinary Error: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return data.secure_url;
  } catch (err) {
    console.error("error upload to cloudinary " + err);
    throw new Error("error upload to cloudinary");
  }
};
