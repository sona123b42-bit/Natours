import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getSessionClient } from "./_lib/sever-actions";
import ClientLayout from "./_components/ClientLayout";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato", // 👈 add this line
});

export const metadata = {
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious Cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
export default async function RootLayout({ children }) {
  const user = await getSessionClient();

  return (
    <html lang="en">
      <body className={`${lato.variable} bg-[#f7f7f7]`}>
        <ClientLayout user={user}>{children}</ClientLayout>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "#374151",
            },
          }}
        />
      </body>
    </html>
  );
}
