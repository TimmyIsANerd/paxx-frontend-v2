"use client"
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { ClipboardIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 5;

export default function PaymentLinksPage() {
  const [paymentLinks, setPaymentLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedStates, setCopiedStates] = useState({});
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    const loadPaymentLinks = () => {
      const savedLinks = localStorage.getItem('paymentLinks');
      if (savedLinks) {
        setPaymentLinks(JSON.parse(savedLinks));
      }
    };

    loadPaymentLinks();
  }, []);

  const totalPages = Math.ceil(paymentLinks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLinks = paymentLinks.slice(startIndex, endIndex);

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      toast.success('Link copied to clipboard!');
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleQRCodeClick = (link) => {
    setSelectedLink(selectedLink?.url === link.url ? null : link);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1C]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Payment Links</h1>

          {paymentLinks.length === 0 ? (
            <div className="bg-[#131B2C] rounded-lg p-6 text-center">
              <p className="text-gray-400">No payment links created yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentLinks.map((link, index) => (
                <div key={index} className="bg-[#131B2C] rounded-lg p-4 shadow-lg">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Payment Link</p>
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm truncate flex-1">{link.url}</p>
                          <button
                            onClick={() => handleCopy(link.url, index)}
                            className="shrink-0 p-1.5 rounded-md hover:bg-[#0B0F1C] text-gray-400 hover:text-white transition-all"
                          >
                            {copiedStates[index] ? (
                              <CheckIcon className="w-4 h-4 text-green-500" />
                            ) : (
                              <ClipboardIcon className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleQRCodeClick(link)}
                        className="shrink-0 ml-4 px-3 py-1.5 bg-purple-600 text-xs font-medium text-white rounded-md hover:bg-purple-700 transition-colors"
                      >
                        {selectedLink?.url === link.url ? 'Hide' : 'Show'} QR
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <p>Created: {new Date(link.createdAt).toLocaleDateString()}</p>
                      {link.signature && (
                        <p className="truncate ml-4 max-w-[200px]">
                          Sig: {link.signature.slice(0, 16)}...
                        </p>
                      )}
                    </div>

                    {selectedLink?.url === link.url && (
                      <div className="mt-3 p-3 bg-white rounded-lg flex justify-center items-center">
                        <div className="w-32 h-32">
                          <QRCode
                            value={link.url}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6 py-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md hover:bg-[#131B2C] text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md hover:bg-[#131B2C] text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}