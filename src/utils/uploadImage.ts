export const uploadImageToCloudinary = async (localUri: string) => {
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const data = await response.json();

    return data.secure_url;

  } catch (err) {
    console.error("error upload to cloudinary " + err);
    throw new Error("error upload to cloudinary");
  }
};
