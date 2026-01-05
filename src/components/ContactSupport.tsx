import { IconWhatsApp } from '@/components/icons'

export default function ContactSupport() {
    const openWhatsApp = () => {
      window.open("https://wa.me/+2347067092314", "_blank")
    }
  
    return (
      <div className="sticky bottom-[100px] right-0 w-full max-w-[1400px] mx-auto z-[2] flex justify-end items-center">
        <div 
          onClick={openWhatsApp} 
          className="w-12 h-12 flex justify-center items-center cursor-pointer relative group"
        >
          <div className="absolute w-14 h-14 rounded-full border-2 border-green-500 animate-pulse group-hover:animate-none" />
          <IconWhatsApp />
        </div>
      </div>
    )
  }