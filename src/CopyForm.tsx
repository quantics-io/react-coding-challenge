import { Button } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import s from './CopyForm.module.scss';
import SelectBox from "./SelectBox";
import { ForecastRunDto } from "./models";
import { overlapWithSourceForecast } from "./utils";

type CopyFormProps = {
    data: ForecastRunDto[];
    onCopyFinished: () => void;
}

export const CopyForm: FC<CopyFormProps> = memo(function CopyForm({ data, onCopyFinished }) {
    const [copySource, setCopySource] = useState<ForecastRunDto | undefined>();
    const [copyTarget, setCopyTarget] = useState<ForecastRunDto | undefined>();

    let targetForecastCandidates: ForecastRunDto[] | undefined;

    if (copySource)
        targetForecastCandidates = overlapWithSourceForecast(data, copySource);

    useEffect(() => {
        if (copyTarget)
            setCopyTarget(undefined);
    }, [copySource])

    const onCopy = () => {
        if (window.confirm(
            `You sure you want to copy from ${copySource?.name} to ${copyTarget?.name}?`) === true)
            onCopyFinished()
    }

    console.log('Count me to meassure re-render.')

    return (
        <div className={s.box}>
            <h1>Forecast Copy Tool</h1>
            <p>
                This tool copies the data from the
                source forecast to the target forecast.
                You can only copy data when both source
                and target forecast have an overlapping period.
            </p>
            <SelectBox
                title={'Source'}
                values={data}
                selected={copySource}
                onChange={(val: ForecastRunDto) => setCopySource(val)}
            />
            {copySource &&
                <SelectBox
                    title={'Target'}
                    values={targetForecastCandidates as ForecastRunDto[]}
                    selected={copyTarget}
                    onChange={(val: ForecastRunDto) => setCopyTarget(val)}
                />
            }
            {copyTarget &&
                <div className={s.positionButton}>
                    <Button
                        onClick={onCopy}
                        variant="contained"
                    >
                        Copy
                    </Button>
                </div>
            }
        </div >
    );
});