import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../ui/LoadingButton";

export default function AuctionForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([{ url: "", alt: "" }]); // Start with one media field
  const [endsAt, setEndsAt] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handler to add a new media field
  const addMediaField = () => {
    if (media.length < 8) {
      setMedia([...media, { url: "", alt: "" }]);
    } else {
      setError("Maximum 8 media items allowed.");
    }
  };

  // Handler to remove a media field
  const removeMediaField = () => {
    if (media.length > 1) {
      const updatedMedia = media.slice(0, media.length - 1);
      setMedia(updatedMedia);
    }
  };

  // Handler to update media fields
  const updateMediaField = (index, field, value) => {
    const updatedMedia = [...media];
    updatedMedia[index][field] = value;
    setMedia(updatedMedia);
  };

  // Submit handler with loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !endsAt) {
      setError("Title and expiry date are required.");
      return;
    }
    setLoading(true); // Set loading state to true on submit

    const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    const formData = {
      title,
      description,
      tags: tagsArray,
      media: media.filter((item) => item.url), // Exclude empty media entries
      endsAt: endsAt.toISOString(), // Convert Date instance to ISO string
    };

    try {
      await onSubmit(formData); // Assuming onSubmit is an async function
    } catch (err) {
      setError("An error occurred during submission.");
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:px-0 px-2 w-full">
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us more about the thing you are selling"
        />
      </div>

      <div>
        <Label className="mb-2">Media (max 8)</Label>

        {media.map((item, index) => (
          <div key={index} className="grid gap-2 mb-2 items-center relative">
            <div className="flex gap-2">
              <Input
                type="url"
                value={item.url}
                className="basis-2/3"
                onChange={(e) => updateMediaField(index, "url", e.target.value)}
                placeholder="Image URL"
                required={index === 0} // Make the first media entry required
              />
              <Input
                type="text"
                className="basis-1/3"
                value={item.alt}
                onChange={(e) => updateMediaField(index, "alt", e.target.value)}
                placeholder="Alt text"
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2 items-center ">
          <Button
            type="button"
            onClick={removeMediaField}
            disabled={media.length <= 1}
            variant="outline"
            size="icon"
          >
            -
          </Button>
          <Button
            type="button"
            onClick={addMediaField}
            disabled={media.length >= 8}
            variant="outline"
            size="icon"
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="grid gap-2 basis-1/3">
          <Label>Ends At</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex text-start items-center justify-between"
              >
                {endsAt ? format(endsAt, "PPP") : "Select a date"}
                <CalendarIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={endsAt}
                onSelect={setEndsAt}
                fromDate={new Date()} // Prevent past dates
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2 basis-2/3">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </div>
      {error && <p className="text-destructive">{error}</p>}
      {loading ? (
        <LoadingButton message={"Posting"} />
      ) : (
        <Button type="submit" className="w-full">
          Create listing{" "}
        </Button>
      )}
    </form>
  );
}
