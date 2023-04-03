import { ReactElement } from "react";
import s from './InfoScreen.module.scss';

interface InfoScreenProps {
    children: ReactElement
}

const InfoScreen = ({ children }: InfoScreenProps) => {
    return <h3 className={s.h3}>{children}</h3>
}

export default InfoScreen;