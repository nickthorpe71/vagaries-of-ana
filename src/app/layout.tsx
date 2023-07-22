import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vagaries of Ana: Vestiges of Another World",
    description: `Embark on a strategic journey where card collection meets tactical combat, set against an enthralling story, enhanced by a top-tier online multiplayer experience.
        
        Dive into the Enchanting Realm of 'Vagaries of Ana: Vestiges of Another World'! Merging the strategic depths of Magic: The Gathering, the captivating creature collection of Pokémon, and the tactical brilliance of Final Fantasy Tactics, this game promises an unparalleled gaming experience. Journey through an engrossing story, amass powerful vagaries, and unleash their potential in thrilling battles. Challenge players globally with an outstanding online multiplayer mode. Are you ready to master the vagaries and uncover the vestiges of another world?`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
