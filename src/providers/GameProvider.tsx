import { useGame } from "@/hooks/useGame";
import { useWindowSize } from "@/hooks/useWindowSize";
import { AnimatePresence, motion } from "motion/react";

export default function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { iframeLink } = useGame();
  const { width } = useWindowSize();

  return (
    <div>
      {children}
      <AnimatePresence>
        {iframeLink && (
          <motion.div
            className="fixed top-[74px] z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: width > 768 ? 74 : 64,
              left: 0,
              width: "100%",
              height: "calc(100vh - " + (width > 768 ? 74 : 64) + "px)",
              zIndex: 9999,
            }}
          >
            {/* <div
              className="absolute top-4 left-4 cursor-pointer z-50 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-all"
              onClick={handleCloseGame}
            >
              <img
                src="/assets/images/white_logo.png"
                alt="Logo"
                className="h-5"
              />
            </div> */}

            <iframe
              src={iframeLink}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              title="Game"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
