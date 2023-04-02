import { ReactElement, memo } from "react";
import s from './CopyForm.module.scss';
import { Button } from "@mui/material";
import { ForecastRunDto } from "./models";
import WithTargetForecasts from "./WithTargetForecasts";

interface CopyFormProps {
    handleCopy: any
    children: ReactElement
}

const CopyForm = memo(function CopyForm({ handleCopy, children }: CopyFormProps) {
    return (
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
    );
})

export default CopyForm;