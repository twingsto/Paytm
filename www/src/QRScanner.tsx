import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export default function QRScanner() {
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
      if (devices.length) {
        scanner.start(
          devices[0].id,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            console.log("Scanned:", decodedText);
          }
        );
      }
    });

    return () => scanner.stop();
  }, []);

  return <div id="reader" style={{ width: "100%" }} />;
}