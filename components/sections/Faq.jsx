import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import BlurFade from "../ui/blur-fade";

const Faq = () => {
  return (
    <section id="faq">
      <BlurFade inView duration={0.7} delay={0.5}>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <h2 className="md:text-4xl text-2xl font-bold">FAQ</h2>
          <Accordion
            type="single"
            collapsible
            className="max-w-[50rem] w-full px-3"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Is it free to use the platform?
              </AccordionTrigger>
              <AccordionContent>
                Yes, signing up and using the platform is completely free.
                Additionally, you receive 1000 free coins when you sign up to
                help you get started!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do returns and refunds work?
              </AccordionTrigger>
              <AccordionContent>
                Returns and refunds depend on the seller&apos;s policies. Please
                check the return policy listed on the item&apos;s page or
                contact the seller directly for more details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I place a bid?</AccordionTrigger>
              <AccordionContent>
                To place a bid, navigate to the listing&apos;s page, enter your
                desired bid amount, and click the "Place Bid" button. Ensure you
                have enough coins in your account to cover the bid.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What happens if I win an auction?
              </AccordionTrigger>
              <AccordionContent>
                If you win an auction, the item will be reserved for you, and
                you will receive an email with details on how to complete the
                transaction. Coins for the winning bid will be automatically
                deducted from your account.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I sell my own items?</AccordionTrigger>
              <AccordionContent>
                Yes, you can list your own items for auction. Simply go navigate
                to "Create listing" - fill in the details, and set your final
                date for the auction.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </BlurFade>
    </section>
  );
};

export default Faq;
