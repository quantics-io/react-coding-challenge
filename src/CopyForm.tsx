import React, {FC, memo} from "react";
import {ForecastRunDto} from "./models";
import s from './CopyForm.module.scss'

type CopyFormProps = {
  data: ForecastRunDto[];
  onCopyFinished: () => void;
}

export const CopyForm: FC<CopyFormProps> = memo(function CopyForm({data, onCopyFinished}) {
  return (
    <div>I can copy forecasts</div>
  );
});