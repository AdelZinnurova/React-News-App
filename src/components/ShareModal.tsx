import { useState } from 'react';
import {
  FacebookShareButton,
  TelegramShareButton,
  VKShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  TelegramIcon,
  VKIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}

export const ShareModal = ({ isOpen, onClose, shareUrl, title }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <div
      className="modal d-flex justify-content-center align-items-center z-1 bg-black bg-opacity-50"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header position-relative">
            <h4 className="modal-title w-100 text-center">Share news</h4>
            <button
              onClick={onClose}
              type="button"
              className="btn-close position-absolute end-0 me-3"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="form-control flex-grow-1"
                style={{
                  minWidth: '350px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              />
              <button
                onClick={copyToClipboard}
                className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
                disabled={copied}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="modal-footer d-flex flex-column gap-3 text-center justify-content-center align-items-center">
            <p className="mb-0">Share on social networks:</p>
            <div className="social-buttons d-flex gap-3 flex-wrap justify-content-center">
              <FacebookShareButton url={shareUrl} title={title}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <VKShareButton url={shareUrl} title={title}>
                <VKIcon size={40} round />
              </VKShareButton>

              <TelegramShareButton url={shareUrl} title={title}>
                <TelegramIcon size={40} round />
              </TelegramShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
