import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import BlurFade from "../ui/blur-fade";

// fake testimonials for good ui :D
const reviews = [
  {
    name: "Emma Johnson",
    username: "@emma.stud.noroff.no",
    body: "I love being able to buy and sell items in a platform designed for students. Absolutely fantastic!",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "Liam Smith",
    username: "@liam.stud.noroff.no",
    body: "This auction site has been such a game changer for student budgets. Highly recommend it!",
    img: "https://avatar.vercel.sh/liam",
  },
  {
    name: "Sophia Brown",
    username: "@sophia.stud.noroff.no",
    body: "I've found so many great deals here. It’s perfect for students who want to save money.",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "Noah Davis",
    username: "@noah.stud.noroff.no",
    body: "Selling my old items has never been easier. This platform is exactly what students need.",
    img: "https://avatar.vercel.sh/noah",
  },
  {
    name: "Olivia Taylor",
    username: "@olivia.stud.noroff.no",
    body: "I can’t believe how easy it is to use. It’s the best platform for student auctions!",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "William Wilson",
    username: "@william.stud.noroff.no",
    body: "Finally, a marketplace tailored for students. I’ve been recommending it to everyone I know!",
    img: "https://avatar.vercel.sh/william",
  },
  {
    name: "Charlotte Moore",
    username: "@charlotte.stud.noroff.no",
    body: "This site has everything a student could need. Great deals and an easy-to-use interface.",
    img: "https://avatar.vercel.sh/charlotte",
  },
  {
    name: "James Anderson",
    username: "@james.stud.noroff.no",
    body: "A brilliant concept for students. It’s been a lifesaver for finding affordable essentials.",
    img: "https://avatar.vercel.sh/james",
  },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className="bg-card border px-3 py-5 rounded-lg max-w-[17rem]">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <section className="relative flex h-[32rem] w-full flex-col items-center justify-center overflow-hidden">
      <BlurFade delay={0.2} inView>
        <div className="text-center py-5 space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold">
            Used by thousands of people
          </h2>
          <p className="text-lg text-muted-foreground">
            Here is what some of them say about us
          </p>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </BlurFade>
    </section>
  );
}
