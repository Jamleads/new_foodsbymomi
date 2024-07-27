import { WHOLESALEPRICE } from "../assets";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const WhosalesPrice = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(data) {
    setNumPages(data.numPages);
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="w-[95%] mx-auto p-3 bg-primary">
      <div style={{ overflow: "scroll", width: "100%" }}>
        <Document
          file={WHOLESALEPRICE}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full"
        >
          <Page pageNumber={pageNumber} width={window.innerWidth * 0.9} />
        </Document>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber === numPages}
          className="px-4 py-2 rounded bg-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WhosalesPrice;
