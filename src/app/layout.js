import "./variables.css";
import "./globals.css";

export const metadata = {
  title: "noBolso"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
