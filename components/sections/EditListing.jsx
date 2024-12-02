"use client";

import EditForm from "@/components/actions/EditForm";
import ListingAPI from "@/lib/api/listings";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Logo from "../ui/Logo";

const EditListing = () => {
  const params = useParams();
  const listingId = params.id;
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await new ListingAPI().listings.read(listingId);
        setPost(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [listingId]);

  if (isLoading)
    return (
      <div className="absolute inset-0 w-full h-full">
        <Skeleton className="w-full h-full flex justify-center items-center">
          <Logo width={120} height={120} className="animate-spin" />
        </Skeleton>
      </div>
    );
  if (!post) return <div>Listing not found.</div>;

  return (
    <section className="min-h-[80vh] flex flex-col gap-2 items-center justify-center w-full max-w-[45rem] mx-auto px-2">
      <EditForm listing={post} />
    </section>
  );
};

export default EditListing;
