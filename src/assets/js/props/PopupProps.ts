import DataSet from "@src/assets/io/DataSet";
import { PopupViewProps } from "./PopupViewProps";

export interface PopupProps {
    component: ({ param, onClose }: PopupViewProps) => React.ReactElement;
    param?: DataSet;
    title?: string;
    nFunc?: (data?: DataSet) => void;
}