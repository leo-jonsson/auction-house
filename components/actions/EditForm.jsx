"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LoadingButton from "../ui/LoadingButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ListingAPI from "@/lib/api/listings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";

const EditForm = ({ listing }) => {
  const [title, setTitle] = useState(listing.title || "");
  const [description, setDescription] = useState(listing.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tags, setTags] = useState(""); // Initialize as an empty string
  const [media, setMedia] = useState(listing.media || [{ url: "", alt: "" }]);

  // Set tags to space-separated string when component mounts
  useEffect(() => {
    if (listing.tags && Array.isArray(listing.tags)) {
      setTags(listing.tags.join(" ")); // Join array items with space
    }
  }, [listing.tags]);

  const addMediaField = () => {
    if (media.length < 8) {
      setMedia([...media, { url: "", alt: "" }]);
    }
  };

  const removeMediaField = () => {
    if (media.length > 1) {
      setMedia(media.slice(0, -1));
    }
  };

  const updateMediaField = (index, field, value) => {
    const updatedMedia = [...media];
    updatedMedia[index][field] = value;
    setMedia(updatedMedia);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required.");
      return;
    }
    setLoading(true); // Set loading state to true on submit

    const tagsArray = tags ? tags.split(" ").map((tag) => tag.trim()) : [];
    const formData = {
      title,
      description,
      tags: tagsArray,
      media: media.filter((item) => item.url), // Exclude empty media entries
    };

    try {
      await new ListingAPI().listings.update(listing.id, formData);
    } catch (error) {
      console.error("Failed to create listing:", error);
    } finally {
      setLoading(false);
      window.location.href = `/listings/${listing.id}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:px-0 w-full mx-auto pt-5"
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name of the item"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description (max 280 characters)</Label>
        <Textarea
          id="description"
          maxLength="280"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about the thing you are selling"
        />
      </div>
      <div>
        <Label>Media (max 8)</Label>
        {media.map((item, index) => (
          <div key={index} className="grid gap-2 mb-2">
            <img
              src={item.url ? item.url : "/placeholder.png"}
              alt=""
              className="max-w-[20rem] mx-auto rounded-lg border aspect-square object-cover"
            />
            <div className="flex flex-col gap-2">
              <Input
                type="url"
                value={item.url}
                onChange={(e) => updateMediaField(index, "url", e.target.value)}
                placeholder="Image URL"
                required={index === 0}
              />
              <Input
                type="text"
                value={item.alt}
                onChange={(e) => updateMediaField(index, "alt", e.target.value)}
                placeholder="Alt text"
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={addMediaField}
            disabled={media.length >= 8}
            variant="outline"
            size="icon"
          >
            +
          </Button>
          <Button
            type="button"
            onClick={removeMediaField}
            disabled={media.length <= 1}
            variant="outline"
            size="icon"
          >
            -
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="tags">Tags (space-separated)</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., electronics, clothing"
          />
        </div>
      </div>
      {error && <span className="text-destructive">{error}</span>}
      {loading ? (
        <div className="flex gap-2">
          <LoadingButton message="Saving changes..." />
          <Button
            type="button"
            className="w-full basis-1/3"
            variant="destructive"
            onClick={() => alert("Delete function here")}
          >
            Delete Listing
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button type="submit" className="w-full basis-2/3">
            Save Changes
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                className="w-full basis-1/3"
                variant="destructive"
              >
                Delete Listing
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your listing from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  onClick={async () => {
                    await new ListingAPI().listings.delete(listing.id);
                    window.location.href = "/listings";
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </form>
  );
};

export default EditForm;
