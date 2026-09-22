import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <FadeUp className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`font-mono text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-[#5bb7f5]" : "text-[#0876d1]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${dark ? "text-white" : "text-[#071c38]"}`}>
        {title}
      </h2>
      {copy ? <p className={`mt-4 text-base leading-relaxed ${dark ? "text-[#b9cad8]" : "text-[#61758b]"}`}>{copy}</p> : null}
    </FadeUp>
  );
}
