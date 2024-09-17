import classes from "./button.module.scss";

export type PropsButton = {
    children?: React.ReactNode;
    href?: string;
    type?: "white";
    sm?: boolean;
    onClick?: () => void; // Change from `void` to `() => void`
};

export const Button = ({ children, href, type = "white", sm, onClick }: PropsButton) => {
    return (
        <div className={classes.Button}>
            <a data-sm={sm} data-type={type} href={href} onClick={onClick}>
                {children}
            </a>
        </div>
    );
};
