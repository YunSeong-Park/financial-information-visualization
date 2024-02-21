"use client";

import { Button } from "@radix-ui/themes";
import DownloadIcon from "../icon/downloadIcon";
import styles from "./downloadBtn.module.scss";

interface DownloadBtnProps {
  blob: Blob;
  fileName: string;
  disabled?: boolean;
}

const DownloadBtn = ({
  blob,
  fileName,
  disabled = false,
}: DownloadBtnProps) => {
  return (
    <Button
      disabled={disabled}
      className={styles.btn}
      onClick={() => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      <DownloadIcon />
    </Button>
  );
};

export default DownloadBtn;
