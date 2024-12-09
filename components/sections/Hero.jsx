import React from "react";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import BoxReveal from "../ui/box-reveal";
import ShimmerButton from "../ui/shimmer-button";
import Link from "next/link";
import BlurFade from "../ui/blur-fade";
import { delay } from "framer-motion";

const images = [
  {
    url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "sneakers",
  },
  {
    url: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "headphones",
  },
  {
    url: "https://images.unsplash.com/photo-1644659306528-259903deccde?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "mac",
  },
  {
    url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "bike",
  },
  {
    url: "https://images.unsplash.com/photo-1486326658981-ed68abe5868e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "truck",
  },
  {
    url: "https://images.unsplash.com/photo-1580130775562-0ef92da028de?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "poster",
  },
  {
    url: "https://images.unsplash.com/photo-1577083639236-0f560d3d771c?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "painting",
  },
  {
    url: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "vinyl",
  },
  {
    url: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "chair",
  },
];

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center py-10 overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center">
        <div className="z-10 flex flex-col items-center lg:items-start gap-5">
          <BlurFade duration={0.5} delay={0.2}>
            <h1 className="whitespace-pre-wrap text-center lg:text-start text-5xl sm:text-7xl font-medium tracking-tighter max-w-[40rem] p-2">
              A place to bid on your{" "}
              <span className="text-primary">dream item</span>
            </h1>
          </BlurFade>
          <BlurFade duration={0.7} delay={0.5}>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/register"
                className="bg-primary text-white rounded-full py-3 px-9 hover:bg-primary/80 transition-all shadow-md"
              >
                Sign up
              </Link>
              <Link href="/listings">
                <ShimmerButton>
                  <span className="text-white flex gap-2 items-center">
                    Explore{" "}
                    <ArrowRight className="size-5 group-hover:translate-x-0.5 transition-all" />
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          </BlurFade>
        </div>
        <Link href="/listings" className="lg:block hidden columns-3 z-20">
          {images.map((img, idx) => (
            <BlurFade key={idx} delay={1 + idx * 0.1} inView>
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                className="rounded-lg mb-3"
              />
            </BlurFade>
          ))}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
