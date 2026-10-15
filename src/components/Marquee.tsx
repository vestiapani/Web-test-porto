"use client";

import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

interface MarqueeProps {
  items: string[];
  direction?: 1 | -1;
  baseVelocity?: number;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const dotColors = ["bg-[#ffb7c5]", "bg-[#a2e4f5]", "bg-[#e2d1f9]"];

export default function Marquee({
  items,
  direction = -1,
  baseVelocity = 1.8,
}: MarqueeProps) {
  const baseX = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;
    const moveBy = direction * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div
      className="
        relative w-full overflow-hidden py-6 md:py-8 select-none z-20
        bg-[#fffafd] border-y border-pink-950/8
        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
      "
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap w-max">
        {[...Array(4)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center">
            {items.map((item, idx) => {
              const isOutline = idx % 2 === 1;
              const dotClass = dotColors[idx % dotColors.length];

              return (
                <div key={idx} className="flex items-center">
                  <span
                    className={`
                      font-syncopate font-bold text-lg md:text-2xl
                      tracking-[0.2em] uppercase px-5 md:px-8
                      ${
                        isOutline
                          ? "text-transparent [-webkit-text-stroke:1.2px_rgba(74,28,54,0.32)]"
                          : "text-pink-950/75"
                      }
                    `}
                  >
                    {item}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${dotClass}`} />
                    <span className="w-5 h-[1px] bg-pink-950/15" />
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
