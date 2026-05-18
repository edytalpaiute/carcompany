import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="">
        <Navigation />
        {children}
        
        </body>
    </html>
  );
}
