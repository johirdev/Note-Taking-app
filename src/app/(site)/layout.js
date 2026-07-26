import { LeftSidebar } from "../Layout/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../Layout/RightSidebar/RightSidebar";
import "../globals.css";
import { Toaster } from "sonner";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: {
    default: `Note Taking App`,
    template: "Note Taking App - %s",
  },
  description: ``,
  keywords: ``,
  openGraph: {
    title: ``,
    description: ``,
    url: "",
    siteName: "Note Taking App",
    images: [
      {
        url: "",
        width: 600,
        height: 630,
        alt: `Note Taking App ${currentYear}`,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={`  antialiased flex flex-col`}>
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
      </body>
    </html>
  );
}
