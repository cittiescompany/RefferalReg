// components/StoreButtons.tsx
import Image from "next/image";
import imgGoogle from '../assets/Google_Play_Arrow_logo.svg';
import imgApple from '../assets/Apple_logo_black.svg';

export default function StoreButtons() {
  return (
    <div className="flex gap-4 mt-8  justify-center ">
      {/* App Store Button */}
      <a
        href="https://www.apple.com/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white shadow-md hover:opacity-90"
      >
        <Image
          src={imgApple}
          alt="App Store"
          width={20}
          height={20}
          className="invert"
        />
        <div className="flex flex-col leading-none">
          <span className="text-[10px]">Download on the</span>
          <span className="text-sm font-semibold">App Store</span>
        </div>
      </a>

      {/* Google Play Button */}
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white shadow-md hover:opacity-90"
      >
        <Image
          src={imgGoogle}
          alt="Google Play"
          width={20}
          height={20}
        />
        <div className="flex flex-col leading-none">
          <span className="text-[10px]">GET IT ON</span>
          <span className="text-sm font-semibold">Google Play</span>
        </div>
      </a>
    </div>
  );
}
