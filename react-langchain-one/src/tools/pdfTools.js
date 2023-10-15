import { pdfjs } from "react-pdf";

const pdfToText = (pdfFile) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);
    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result);
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      const numPages = pdf.numPages;
      let text = "";
      for (let i = 1; i <= numPages; i++) {
        const pdfPage = await pdf.getPage(i);
        const pdfText = await pdfPage.getTextContent();
        text += pdfText.items.map((item) => item.str).join(" ");
      }
      resolve(text);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export { pdfToText };
