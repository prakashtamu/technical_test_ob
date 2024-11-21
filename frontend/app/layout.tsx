import Sidebar from "../components/sidebar";
import "./css/app.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
