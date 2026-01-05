import Image from "next/image";
import Link from "next/link";

const sponsorImages = [
  { id: 1, url: "/assets/images/sponsors/shacksLogo.png", alt: "Shacks Logo" },
  {
    id: 2,
    url: "/assets/images/sponsors/beGambleAware.png",
    alt: "Be Gamble Aware Logo",
  },
  { id: 3, url: "/assets/images/sponsors/oyoState.jpg", alt: "Oyo State Logo" },
  { id: 4, url: "/assets/images/sponsors/paystack.png", alt: "Paystack Logo" },
  {
    id: 5,
    url: "/assets/images/sponsors/masterCard.png",
    alt: "MasterCard Logo",
  },
  { id: 6, url: "/assets/images/sponsors/visa.png", alt: "Visa Logo" },
  { id: 7, url: "/assets/images/sponsors/verve.png", alt: "Verve Logo" },
  { id: 8, url: "/assets/images/sponsors/gamble.jpeg", alt: "Gamble Logo" },
  { id: 9, url: "/assets/images/sponsors/monnify.jpg", alt: "Monnify Logo" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full md:mb-16 mb-8">
      <div className="container mx-auto px-4 max-w-[1140px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 about-container text-white">
          <p className="text-sm grid gap-2.5">
            <span className="border-t-2 border-white w-[30px]"></span>
            <span>Onerapidplay is where you punch your ticket to fun.</span>
            <span>
              If you've been looking for a digital casino experience to
              remember, then Onerapdiplay is your lucky ticket. Onerapidplay is
              a great place to go and spend some time playing your favorite
              games or discovering new ones.
            </span>
            {/* <span>
              With nearly 2,000 games and counting, the range of games you will find here is impressive. There truly is
              something for everyone from Crash games to Blackjack, Roulette to Slots, Live casino to Table games, and
              jackpots to poker games.
            </span> */}
          </p>
          <p className="text-sm">
            <span></span>
            <span>
              If you are new to online casinos, then don't worry - there isn't
              too much to learn! If you have ever been to a land-based casino,
              you will remember how different parts of the casino hosted
              different game types and if you have never been to one, you can
              always play the Demo version of these games to get a hang of it
              before playing for real money.
            </span>
          </p>
          <p className="text-sm">
            <span></span>
            <span>
              People play online casino for all sorts of reasons. Some just want
              to relax on the reels and spin for a nice win while others are
              looking for instant big wins.
            </span>
            <span>
              We should say that we like responsible gamblers 18+ at
              Onerapidplay, so the usual rules of only betting with what you can
              afford to lose and only playing for fun apply.
            </span>
            <span>
              Onerapidplay Casino is about relaxation, so whatever online casino
              game you choose, sit back and relax on your quest for gold!
            </span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 my-12">
          {sponsorImages.map((image) => (
            <div key={image.id} className="image-container">
              <img
                src={image.url}
                width={100}
                height={100}
                alt={image.alt}
                className="h-20 w-auto object-contain rounded-lg sm:h-10"
              />
            </div>
          ))}
        </div>

        <div className="divide-y dark:bg-coolGray-800 dark:text-coolGray-100">
          <div className="py-6 text-white text-sm text-center dark:text-coolGray-400">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
              <Link
                href="/terms-and-conditions"
                className="hover:text-orange-500 transition-colors underline"
              >
                Terms & Conditions
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/privacy-policy"
                className="hover:text-orange-500 transition-colors underline"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/refund-policy"
                className="hover:text-orange-500 transition-colors underline"
              >
                Refund Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/faq"
                className="hover:text-orange-500 transition-colors underline"
              >
                FAQ
              </Link>
            </div>
            <div>© Copyright {currentYear}. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
