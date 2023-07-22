import { JSX, ClassAttributes, ImgHTMLAttributes } from "react";
import { UserPlus } from "lucide-react";

export const Icons = {
    Logo: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLImageElement> &
            ImgHTMLAttributes<HTMLImageElement>
    ) => <img src='/lost-one-head-2.png' alt='Logo' {...props} />,
    UserPlus,
};

export type Icon = keyof typeof Icons;
