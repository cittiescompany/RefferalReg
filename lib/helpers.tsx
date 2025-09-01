import * as Flags from "country-flag-icons/react/3x2";

interface CountryFlagProps {
  code: string; 
  size?: string;
}

export default function CountryFlag({ code, size = "w-6 h-6" }: CountryFlagProps) {
  const Flag = (Flags as any)[code];
  return Flag ? <Flag className={size} title={code} /> : null;
}