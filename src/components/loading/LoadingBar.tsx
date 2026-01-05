interface LoadingBarProps {
  loading: boolean
}

export default function LoadingBar({ loading }: LoadingBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-transparent z-10">
      {loading && (
        <div className="w-full h-full bg-[#faa100] animate-loading" />
      )}
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading {
          animation: loading 1s infinite;
        }
      `}</style>
    </div>
  )
}