import { ReactElement, memo } from "react";
import s from './CopyForm.module.scss';

interface CopyFormProps {
    children: ReactElement
}

const CopyForm = memo(function CopyForm({ children }: CopyFormProps) {
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
})

export default CopyForm;