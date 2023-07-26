import { UserPlus } from "lucide-react";
import Image from "next/image";

export const Icons = {
    Logo: () => (
        <Image src='/lost-one-head-2.png' alt='Logo' width={32} height={32} />
    ),
    UserPlus,
};

export type Icon = keyof typeof Icons;
