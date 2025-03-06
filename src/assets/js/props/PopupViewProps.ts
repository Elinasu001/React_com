import DataSet from "@src/assets/io/DataSet";

export interface PopupViewProps {
    param?: DataSet;
    onClose?: (data?: DataSet) => void;
}