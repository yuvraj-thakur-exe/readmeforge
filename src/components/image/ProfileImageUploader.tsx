'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import { useReadmeStore } from '#/store/useReadmeStore';
import {
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Github,
  Loader2,
  ZoomIn,
} from 'lucide-react';

interface ProfileImageUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSaved: (imageUrl: string, altText: string) => void;
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  isOpen,
  onClose,
  onImageSaved,
}) => {
  const githubUser = useReadmeStore(state => state.config.settings.user.github);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const [altText, setAltText] = useState<string>('Profile Avatar');
  const [format, setFormat] = useState<'image/png' | 'image/webp' | 'image/jpeg'>('image/png');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const onCropComplete = useCallback(
    (_croppedArea: unknown, croppedPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAltText(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  };

  const handlePullGithubAvatar = () => {
    if (!githubUser) return;
    const avatarUrl = `https://github.com/${githubUser}.png?size=400`;
    setImageSrc(avatarUrl);
    setAltText(`${githubUser}'s GitHub Avatar`);
  };

  const createCroppedImage = async (): Promise<string> => {
    if (!imageSrc || !croppedAreaPixels) return imageSrc || '';

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    await new Promise(resolve => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return imageSrc;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        async blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }

          try {
            // Compress image with browser-image-compression
            const file = new File([blob], 'cropped-profile', { type: format });
            const compressed = await imageCompression(file, {
              maxSizeMB: 0.15,
              maxWidthOrHeight: 400,
              useWebWorker: true,
              fileType: format,
            });

            const reader = new FileReader();
            reader.readAsDataURL(compressed);
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          } catch {
            // Fallback directly to canvas data URL
            resolve(canvas.toDataURL(format, 0.9));
          }
        },
        format,
        0.9
      );
    });
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      const finalImage = await createCroppedImage();
      onImageSaved(finalImage, altText);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-neutral-100">
              Profile Avatar / Image Optimizer
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {!imageSrc ? (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 hover:border-amber-500 rounded-xl p-8 cursor-pointer transition-colors text-center group">
                <Upload className="w-8 h-8 text-neutral-400 group-hover:text-amber-500 mb-2 transition-colors" />
                <span className="text-sm font-medium text-neutral-200">
                  Upload an image (PNG, JPG, WebP)
                </span>
                <span className="text-xs text-neutral-500 mt-1">
                  Square avatars or horizontal banners
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {githubUser && (
                <button
                  type="button"
                  onClick={handlePullGithubAvatar}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Pull avatar directly from @{githubUser} on GitHub</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Crop Canvas */}
              <div className="relative w-full h-64 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Controls */}
              <div className="space-y-3 bg-neutral-950/60 p-3.5 rounded-lg border border-neutral-800 text-xs">
                <div className="flex items-center gap-3">
                  <ZoomIn className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <span className="text-neutral-400 font-mono w-10 text-right">
                    {zoom.toFixed(1)}x
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Alt Text (Accessibility)
                    </label>
                    <input
                      type="text"
                      value={altText}
                      onChange={e => setAltText(e.target.value)}
                      placeholder="Profile avatar"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Target Format
                    </label>
                    <select
                      value={format}
                      onChange={e => setFormat(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="image/png">PNG (Lossless, Recommended)</option>
                      <option value="image/webp">WebP (Smallest Size)</option>
                      <option value="image/jpeg">JPEG (Compressed)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setImageSrc(null)}
                  className="px-3 py-1.5 rounded text-xs text-neutral-400 hover:text-neutral-200"
                >
                  Choose Different Image
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-semibold shadow transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Optimizing...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" /> Apply & Embed
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
