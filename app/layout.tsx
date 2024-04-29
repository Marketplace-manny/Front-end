import Footer from "@/components/Footer";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata = {
  title: "MarketPlaceManny",
  description: "Version 1.0.0",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body>
        <ChakraProvider>
          <Providers session={session}>
            <Navbar />
            <main className="py-12 px-6">{children}</main>
            <Footer />
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
