import Modal from "../Modal";

interface Props {
    onClose: () => void;
    onLogout: () => void;
    open: boolean;
}

export function LogoutPromptModal({ onClose, onLogout, open }: Props) {
    return (
        open ? <Modal title="Logout" onClose={onClose}>
            <div className="bg-white">
                <p className="text-lg font-medium mb-6 text-gray-800">Are you sure you want to logout?</p>
                <div className="flex justify-end gap-4">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-[#faa100] text-[#faa100] hover:bg-[#faa100]/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onLogout}
                        className="px-4 py-2 rounded-md bg-[#faa100] text-white hover:bg-[#faa100]/90 font-medium transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </Modal> : null
    )
}