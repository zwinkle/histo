import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const ImagePositionEditor = ({ imageUrl, initialX, initialY, onPositionChange }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // Gunakan useMotionValue untuk posisi, ini menghilangkan "jitter".
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // useEffect untuk mengatur posisi awal saat gambar atau data berubah.
    // Dibuat lebih andal dengan menunggu gambar benar-benar dimuat.
    useEffect(() => {
        const image = imageRef.current;
        const container = containerRef.current;
        if (!image || !container) return;

        const setInitialPosition = () => {
            const imageWidth = image.offsetWidth;
            const imageHeight = image.offsetHeight;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            // Rentang pergeseran yang mungkin (jarak maksimum gambar bisa digeser)
            const xRange = imageWidth - containerWidth;
            const yRange = imageHeight - containerHeight;

            // Hitung posisi piksel dari persentase awal
            const newX = -xRange * (initialX / 100);
            const newY = -yRange * (initialY / 100);

            x.set(newX || 0);
            y.set(newY || 0);
        };

        if (image.complete) {
            setInitialPosition();
        } else {
            image.addEventListener('load', setInitialPosition, { once: true });
        }
        
        return () => {
            image.removeEventListener('load', setInitialPosition);
        };
    }, [imageUrl, initialX, initialY, x, y]);


    const handleDragEnd = () => {
        const image = imageRef.current;
        const container = containerRef.current;
        if (image && container) {
            const imageWidth = image.offsetWidth;
            const imageHeight = image.offsetHeight;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            const finalX = x.get();
            const finalY = y.get();

            const xRange = imageWidth - containerWidth;
            const yRange = imageHeight - containerHeight;

            // Hitung posisi baru dalam persen. Pastikan tidak ada pembagian dengan nol.
            const newXPercent = xRange > 0 ? (-finalX / xRange) * 100 : 50;
            const newYPercent = yRange > 0 ? (-finalY / yRange) * 100 : 50;

            // Kirim nilai yang sudah dibatasi antara 0 dan 100
            onPositionChange(
                Math.min(100, Math.max(0, newXPercent)),
                Math.min(100, Math.max(0, newYPercent))
            );
        }
    };

    return (
        <div>
            <p className="text-sm text-retro-text/70 mb-2">Geser gambar untuk menyesuaikan posisi:</p>
            <div
                ref={containerRef}
                className="w-full h-48 rounded-lg overflow-hidden bg-retro-bg cursor-grab active:cursor-grabbing relative"
            >
                {imageUrl && (
                    <motion.img
                        key={imageUrl}
                        ref={imageRef}
                        src={imageUrl}
                        // Ukuran gambar dibuat lebih besar agar ada ruang untuk digeser
                        className="absolute h-auto w-auto min-w-full min-h-full max-w-[200%] max-h-[200%] object-cover"
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0}
                        onDragEnd={handleDragEnd}
                        style={{ x, y }} // Style membaca langsung dari motion value
                        whileDrag={{ cursor: "grabbing" }}
                    />
                )}
            </div>
        </div>
    );
};

export default ImagePositionEditor;
