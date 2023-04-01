import { ReactElement } from "react";
import s from './Layout.module.scss';

interface LayoutProps {
    children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={s.positionBox}>
            <div className={s.box}>
                <h1>Forecast Copy Tool</h1>
                <p>
                    This tool copies the data from the
                    source forecast to the target forecast.
                    You can only copy data when both source
                    and target forecast have an overlapping period.
                </p>
                {children}
            </div>
        </div>
    );
}

export default Layout;