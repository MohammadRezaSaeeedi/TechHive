
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import "./globals.css";
export const metadata = {
  title: "Tech | Hive",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
