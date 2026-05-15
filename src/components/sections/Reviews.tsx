import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motion";

const reviews = [
  {
    quote:
      "Calm, professional, and quietly confident throughout. They focused on quality, not rushing the order.",
    name: "siddharthsha914",
    co: "India · Fiverr Client",
  },
  {
    quote:
      "Excellent work from Kishore and the team. Great coordination, attention to detail, and timely delivery.",
    name: "vbbbvsb",
    co: "India · Fiverr Client",
  },
  {
    quote: "Really appreciate you sticking to the timeline. Smooth, reliable execution.",
    name: "kumar_sai8",
    co: "India · Fiverr Client",
  },
  {
    quote: "Worked for months and it was perfect. Great communication and results.",
    name: "techforward1",
    co: "Germany · Fiverr Client",
  },
  {
    quote: "Top work, always again.",
    name: "techforward1",
    co: "Germany · Fiverr Client",
  },
  {
    quote:
      "Excellent project delivery with clean design and solid implementation. Met all objectives.",
    name: "rsjayakrishnan",
    co: "India · Fiverr Client",
  },
  {
    quote: "Great working with you again!",
    name: "lugoye22",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "The Barath and Kishore team exceeded expectations. Sweet, soft-spoken, and very professional.",
    name: "kumar_sai8",
    co: "India · Fiverr Client",
  },
  {
    quote: "Great work, very detailed.",
    name: "techforward1",
    co: "Germany · Fiverr Client",
  },
  {
    quote:
      "Absolutely one of the best developers I have worked with. Very knowledgeable and responsive.",
    name: "lugoye22",
    co: "United States · Fiverr Client",
  },
  {
    quote: "Very easy and professional to work with.",
    name: "techforward1",
    co: "Germany · Fiverr Client",
  },
  {
    quote:
      "Kishore is an outstanding full-stack developer. Sleek frontend, robust backend, and smooth communication.",
    name: "harihp317",
    co: "India · Fiverr Client",
  },
  {
    quote:
      "Everything was smooth from start to finish. Clean, professional, and well organized.",
    name: "yosf_err",
    co: "Morocco · Fiverr Client",
  },
  {
    quote:
      "Third time working together and another outstanding experience. Always goes beyond the scope.",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote: "Great working with Barath. Very patient.",
    name: "kteglas17",
    co: "United States · Fiverr Client",
  },
  {
    quote: "I recommend him for others. He goes beyond my thoughts.",
    name: "sodiq_ol001",
    co: "Nigeria · Fiverr Client",
  },
  {
    quote:
      "Very knowledgeable and polite, with great communication and quality delivery.",
    name: "bakthisamasthan",
    co: "United States · Fiverr Client",
  },
  {
    quote: "Excellent work on time. A+.",
    name: "rentacarplus",
    co: "United States · Fiverr Client",
  },
  {
    quote: "Very good. Fast, and communication was top.",
    name: "khassoukhanovkh",
    co: "France · Fiverr Client",
  },
  {
    quote: "Good work and timely delivery.",
    name: "sd_cloudexotech",
    co: "India · Fiverr Client",
  },
  {
    quote: "As always, a pleasure to work with.",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote: "Delivered on time and matched my vision perfectly.",
    name: "tomodoromethod",
    co: "Australia · Fiverr Client",
  },
  {
    quote: "Another great delivery. Always on point.",
    name: "greensports",
    co: "Australia · Fiverr Client",
  },
  {
    quote: "Nothing but positives on this delivery.",
    name: "greensports",
    co: "Australia · Fiverr Client",
  },
  {
    quote: "Amazing work!",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote: "Good work spirit.",
    name: "nabai1",
    co: "United Kingdom · Fiverr Client",
  },
  {
    quote: "Great to work with. Flexible and responds fast to requests.",
    name: "shanmuk_ram_00",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Excellent experience. Professional, responsive, and delivered exactly what I needed.",
    name: "higherself19",
    co: "India · Fiverr Client",
  },
  {
    quote:
      "Delivered beyond the timeline but with excellent quality and great creative input.",
    name: "higherself19",
    co: "India · Fiverr Client",
  },
  {
    quote:
      "Second time working together. Very fast, responsive, and technical. Great job.",
    name: "mina71246",
    co: "France · Fiverr Client",
  },
  {
    quote:
      "Excellent understanding and delivery. Did everything I asked for and more.",
    name: "mina71246",
    co: "France · Fiverr Client",
  },
  {
    quote: "Great job!",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote: "Very understanding and professional.",
    name: "u_15212cd54a45",
    co: "Tanzania · Fiverr Client",
  },
  {
    quote:
      "Expedited delivery and strong client focus. We will continue working with this team.",
    name: "macowen",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Great experience. Clear communication, responsive to revisions, and committed to quality.",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote: "Great freelancer who goes beyond expectations.",
    name: "incahoots1",
    co: "Philippines · Fiverr Client",
  },
  {
    quote:
      "Great work with professional communication. Did all we requested.",
    name: "dave_gut",
    co: "Israel · Fiverr Client",
  },
  {
    quote:
      "Strong technical expertise and attention to detail. Fast, responsive, and well-designed.",
    name: "bakthisamasthan",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Very cooperative and delivered more than promised. Hope to work again.",
    name: "shekharsinghs",
    co: "Netherlands · Fiverr Client",
  },
  {
    quote:
      "Outstanding work and highly recommended. Great understanding and execution.",
    name: "ytfbinstaengage",
    co: "India · Fiverr Client",
  },
  {
    quote:
      "Exceptional team, very responsive, and finished earlier than expected.",
    name: "swampbytche",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Exceeded expectations and made edits until I was completely satisfied.",
    name: "swampbytche",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Fantastic product with great attention to detail. Would hire again.",
    name: "swampbytche",
    co: "United States · Fiverr Client",
  },
  {
    quote:
      "Amazing experience. Fast, professional, and high-quality delivery.",
    name: "jaisuryas",
    co: "India · Fiverr Client",
  },
];

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
  </svg>
);

const Card = ({ r }: { r: typeof reviews[number] }) => (
  <div className="w-[380px] flex-shrink-0 rounded-2xl border border-white/5 bg-darkcard p-8 sm:w-[420px]">
    <div className="mb-5 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} />
      ))}
    </div>
    <p className="mb-6 font-body text-base leading-relaxed text-cream/80 sm:text-lg">"{r.quote}"</p>
    <div className="font-display-bold text-lg text-cream">{r.name}</div>
    <div className="mt-1 font-mono-tag text-xs text-gold">
      {r.co.split(" · ")[0]}
    </div>
  </div>
);

const Reviews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  return (
    <section ref={sectionRef} id="reviews" className="overflow-hidden bg-dark py-28 lg:py-36">
    <motion.div
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-7xl px-6 lg:px-10"
    >
      <motion.div variants={revealItem}>
        <p className="font-mono-tag text-sm text-gold">// Testimonials</p>
        <h2 className="mt-4 font-display text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl xl:text-8xl">
          What clients
          <br />
          <span className="text-gold-gradient">say about us</span>
        </h2>
        <p className="mt-4 font-mono-tag text-xs text-cream/65">
          Total reviews: 55
        </p>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.2 }}
      className="mt-16 overflow-hidden"
    >
      <motion.div 
        className="marquee-track flex w-max gap-4"
        style={{ x: marqueeX }}
      >
        {[...reviews, ...reviews].map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </motion.div>
    </motion.div>
  </section>
  );
};

export default Reviews;
