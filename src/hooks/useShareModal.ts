import { useState } from "react";

export const useShareModal = () => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState({ url: '', title: '' });

    const openShareModal = (url: string, title: string) => {
        setShareData({ url, title });
        setIsShareModalOpen(true);
    };

    const closeShareModal = () => {
        setIsShareModalOpen(false);
    };

    return {
        isShareModalOpen,
        shareData,
        openShareModal,
        closeShareModal
    };
};