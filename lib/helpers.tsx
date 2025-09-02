import * as Flags from "country-flag-icons/react/3x2";

interface CountryFlagProps {
  code: string; 
  size?: string;
}

export default function CountryFlag({ code, size = "w-6 h-6" }: CountryFlagProps) {
  
  const Flag = (Flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[code];
  return Flag ? <Flag className={size} aria-label={code} /> : null;
}

export  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };