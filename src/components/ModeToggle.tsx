import { FaMobileScreen } from "react-icons/fa6";
import { IoDesktopOutline } from "react-icons/io5";

const modes: Array<{
    id: "mobile" | "desktop",
    icon: React.ElementType
}> = [
        {
            id: "mobile",
            icon: FaMobileScreen
        },
        {
            id: "desktop",
            icon: IoDesktopOutline
        }
    ]

export default function ModeToggle({ viewMode, setViewMode }: { viewMode: "mobile" | "desktop", setViewMode: (m: "mobile" | "desktop") => void }) {
    return <div className="flex">
        <div className="bg-white rounded-full p-1.5 shadow-sm border border-stone-100">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${viewMode === mode.id
                        ? "bg-stone-900 text-white shadow-md"
                        : "text-stone-500 hover:text-stone-900"
                        }`}
                >

                    <p className="hidden md:block">{mode.id.charAt(0).toUpperCase() + mode.id.slice(1)}</p>
                    <mode.icon className="w-5 h-5" />
                </button>
            ))}
        </div>
    </div>
}