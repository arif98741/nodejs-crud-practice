import React from "react";
import { Menu } from "lucide-react"; // For the icon

const HamburgerIcon = () => {
    return (
        <button className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none">
            <Menu size={30} />
        </button>
    );
};

export default HamburgerIcon;