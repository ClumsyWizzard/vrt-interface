import { FunctionComponent } from "react";
import Navbar from "../navbar";

const BaseLayout: FunctionComponent = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 space-y-10 sm:px-6 lg:px-8">{children}</div>
            </div>
        </>
    );
};

export default BaseLayout;
