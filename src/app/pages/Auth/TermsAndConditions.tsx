import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

export default function TermsAndConditions(props: any) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="terms-and-conditions"
      open={open}
    >
      <DialogTitle>
        Terms of Service ("Terms") <small>Updated: Feb 14, 2020</small>
      </DialogTitle>
      <DialogContent>
        <p>
          Please read these Terms of Service ("Terms", "Terms of Service")
          carefully before using the http://www.auditionrevolution.com website
          and the Audition Revolution mobile application (the "Service")
          operated by Audition Revolution LLC ("us", "we", or "our").
        </p>

        <p>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </p>

        <p>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </p>

        <br />
        <h3>Termination</h3>
        <p>
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </p>

        <p>
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
        </p>

        <br />
        <h3>Subscriptions</h3>
        <p>
          Some parts of the Service are billed on a subscription basis
          ("Subscription(s)"). You will be billed in advance on a recurring
          monthly or annual basis.
        </p>

        <br />
        <h3>Content</h3>
        <p>
          Our Service allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          material ("Content"). You are responsible for the content shared on
          our site. Any violations – either legal or ethical – are your
          responsibility and not the responsibility of Audition Revolution.
        </p>

        <br />
        <h3>Links To Other Web Sites</h3>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by Audition Revolution.
        </p>

        <p>
          Audition Revolution has no control over, and assumes no responsibility
          for, the content, privacy policies, or practices of any third party
          web sites or services. You further acknowledge and agree that Audition
          Revolution shall not be responsible or liable, directly or indirectly,
          for any damage or loss caused or alleged to be caused by or in
          connection with use of or reliance on any such content, goods or
          services available on or through any such web sites or services.
        </p>

        <br />
        <h3>Changes</h3>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>

        <br />
        <h3>Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at
          support@auditionrevolution.com.
        </p>
      </DialogContent>
    </Dialog>
  );
}
