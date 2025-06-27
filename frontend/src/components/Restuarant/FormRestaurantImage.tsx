import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { restaurantFormData } from "./types";

const FormRestaurantImage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<restaurantFormData>();
  const imageFile = watch("imageFile");
  const existingImg = watch("imageUrl");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file (JPEG, PNG, GIF, etc.)");
        setValue("imageFile", undefined);
        return;
      }

      // Check file size (e.g., 5MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error("File is too large. Maximum size is 10MB.");
        setValue("imageFile", undefined);
        return;
      }

      // setImageUrl(URL.createObjectURL(file));
      setValue("imageFile", file);
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // Effect to create and clean up the object URL for preview
  useEffect(() => {
    if (imageFile instanceof File) {
      // Check if imageFile is a File object
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      // Cleanup function to revoke the object URL when the component unmounts
      // or when imageFile changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null); // Clear preview if no file is selected
    }
  }, [imageFile]); // Re-run effect when imageFile changes

  return (
    <div>
      <h1 className="font-bold text-2xl">Image</h1>
      <p className="text-gray-600 font-medium">
        Add an image that will be displayed on your restaurant listing in the
        search results. Adding a new image will override the existing one{" "}
      </p>
      {errors?.imageFile && (
        <p className="text-red-500 text-sm">{errors?.imageFile.message}</p>
      )}
      <div
        {...getRootProps()}
        className="border-2 w-full md:w-[70%] border-dashed p-6 rounded-lg cursor-pointer text-center my-6"
      >
        <input {...getInputProps()} accept="image/*" />

        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image, or click to select</p>
        )}
        {(previewUrl || existingImg) && (
          <img
            src={previewUrl || existingImg}
            alt="Uploaded"
            className="mt-4 w-48 h-48 object-cover "
          />
        )}
      </div>
    </div>
  );
};

export default FormRestaurantImage;
