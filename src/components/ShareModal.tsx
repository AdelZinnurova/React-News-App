import { useState } from "react";
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
} from "react-share";

export interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareUrl: string;
    title: string;
}

export const ShareModal = ({ isOpen, onClose, shareUrl, title }: ShareModalProps) => {
    const [copied, setCopied] = useState(false); // состояние: true если ссылка скопирована

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
            className="modal-overlay"
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '500px',
                    position: 'relative',
                }}
            >
                <button
                    className="close-btn"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                    }}
                >
                    ×
                </button>

                <h3 className="modal-title" style={{ margin: '0 0 20px 0', textAlign: 'center' }}>
                    Поделиться статьей
                </h3>

                <div className="link-container" style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="form-control"
                        style={{ flex: 1 }}
                    />
                    <button
                        onClick={copyToClipboard}
                        className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
                        disabled={copied}
                    >
                        {copied ? '✓ Скопировано' : 'Копировать'}
                    </button>
                </div>

                <div className="social-share">
                    <p style={{ textAlign: 'center', marginBottom: '16px', fontWeight: '500' }}>
                        Поделиться в соцсетях:
                    </p>
                    <div className="social-buttons" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        flexWrap: 'wrap'
                    }}>
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
    );
};