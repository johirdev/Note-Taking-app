import { LeftSidebar } from "../Layout/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../Layout/RightSidebar/RightSidebar";
import GlobalDataProvider from "./globalDataProvider";
import "../globals.css";
import { Toaster } from "sonner";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: {
    default: `Note Taking Application`,
    template: "Note Taking Application - %s",
  },
  description: ``,
  keywords: ``,
  openGraph: {
    title: ``,
    description: ``,
    url: "",
    siteName: "Note Taking Application",
    images: [
      {
        url: "",
        width: 600,
        height: 630,
        alt: `Note Taking Application ${currentYear}`,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`  antialiased flex flex-col`}>
        <GlobalDataProvider>
          <div>
            <div
              className="max-width mx-auto"
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr 300px",
                height: "100vh",
                background: "#0c0c14",
              }}
            >
              <LeftSidebar />
              <div className="">{children}</div>
              <RightSidebar />
            </div>
          </div>
          <Toaster richColors position="top-right" />
        </GlobalDataProvider>
      </body>
    </html>
  );
}
