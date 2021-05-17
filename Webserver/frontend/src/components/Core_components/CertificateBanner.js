import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import greenCertificate from "../../assets/images/greencert.png";
import redCertificate from "../../assets/images/redcert.png";

function CertificateBanner({ data, limit, loading }) {
  const [certificateGranted, setCertificateGranted] = useState(false);
  const checkLatest = (data, limit) => {
    const checkExceeded = data.reduce((total, item) => {
      if (item[1] >= limit) {
        return total + 1;
      }
      return total;
    }, 0);
    setCertificateGranted(!!checkExceeded);
  };
  useEffect(() => {
    checkLatest(data, limit);
    return () => {
      // cleanup
    };
  }, [data, limit]);
  return (
    <Container className="text-center">
      {loading ? (
        <Spinner animation="border" />
      ) : certificateGranted ? (
        <p>
          <Image
            src={redCertificate}
            className="certificate"
            alt="certificate granted"
          />
          The recent measurements are <b>NOT IN COMPLIANCE</b> with government
          emission limits
        </p>
      ) : (
        <p>
          <Image
            src={greenCertificate}
            className="certificate"
            alt="certificate granted"
          />
          The recent measurement are <b>IN COMPLIANCE</b> with government
          emission limits
        </p>
      )}
    </Container>
  );
}

export default CertificateBanner;
