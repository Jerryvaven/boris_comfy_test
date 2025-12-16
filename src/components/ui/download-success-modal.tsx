"use client";

import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription,
  ModalFooter 
} from "@/components/ui/modal";
import { CheckCircle, Download, X } from "lucide-react";

interface DownloadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileSize?: string;
}

export function DownloadSuccessModal({ 
  isOpen, 
  onClose, 
  fileName, 
  fileSize = "2.4 MB" 
}: DownloadSuccessModalProps) {
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md">
        <ModalHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <ModalTitle className="text-xl font-bold text-white">
            Download Successful!
          </ModalTitle>
          <ModalDescription className="text-gray-300 mt-2">
            Your comic has been downloaded successfully in CBR format.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          {/* File Info */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Download className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {fileName}
                </p>
                <p className="text-xs text-gray-400">
                  CBR Format • {fileSize}
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center">
            <p className="text-sm text-gray-300">
              The file has been saved to your default downloads folder.
            </p>
          </div>
        </div>

        <ModalFooter className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-300 transition-colors"
          >
            Continue Reading
          </button>
          <button
            onClick={() => {
              // Open downloads folder (this would need to be implemented based on the platform)
              onClose();
            }}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Open Downloads
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}