import s from './InfoScreen.module.scss';

interface InfoScreenProps {
    title: string,
    subTitle?: string,
}

const InfoScreen = ({ title, subTitle }: InfoScreenProps) =>
    <h3 className={s.h3}>
        <p>{title}</p>
        {subTitle &&
            <p>{subTitle}</p>}
    </h3>


export default InfoScreen;