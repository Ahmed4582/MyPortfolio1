"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  t: (key: any) => string;
  language: string;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  t, 
  language 
}: PaginationProps) {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex flex-col items-center space-y-6 mt-16"
      variants={itemVariants}
    >
      {/* Page Numbers - Responsive */}
      <div className="flex items-center space-x-1 md:space-x-2">
        {/* Show first page */}
        {currentPage > 3 && (
          <>
            <Button
              onClick={() => onPageChange(1)}
              variant="outline"
              size="sm"
              className="w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm transition-all duration-300 transform hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-300 dark:border-purple-600"
            >
              1
            </Button>
            {currentPage > 4 && (
              <span className="text-gray-400 text-xs md:text-sm">...</span>
            )}
          </>
        )}

        {/* Show pages around current page */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(pageNum => 
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          )
          .map((pageNum, index, array) => {
            // Add ellipsis if there's a gap
            const prevPage = array[index - 1];
            const showEllipsis = prevPage && pageNum - prevPage > 1;
            
            return (
              <div key={pageNum} className="flex items-center">
                {showEllipsis && (
                  <span className="text-gray-400 text-xs md:text-sm mx-1">...</span>
                )}
                <Button
                  onClick={() => onPageChange(pageNum)}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className={`w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm transition-all duration-300 transform hover:scale-105 ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-300 dark:border-purple-600"
                  }`}
                >
                  {pageNum}
                </Button>
              </div>
            );
          })}

        {/* Show last page */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && (
              <span className="text-gray-400 text-xs md:text-sm">...</span>
            )}
            <Button
              onClick={() => onPageChange(totalPages)}
              variant="outline"
              size="sm"
              className="w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm transition-all duration-300 transform hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-300 dark:border-purple-600"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <Button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
          size="lg"
          className="disabled:opacity-50 disabled:cursor-not-allowed border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          <span className="ml-2 text-sm md:text-base">
            {t('projects.previous')}
          </span>
        </Button>
        
        <Badge variant="secondary" className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700">
          {language === 'ar' ? `${t('projects.page')} ${currentPage} ${t('projects.of')} ${totalPages}` : `${t('projects.page')} ${currentPage} ${t('projects.of')} ${totalPages}`}
        </Badge>
        
        <Button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant="outline"
          size="lg"
          className="disabled:opacity-50 disabled:cursor-not-allowed border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
          <span className="mr-2 text-sm md:text-base">
            {t('projects.next')}
          </span>
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center space-x-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          variant="ghost"
          size="sm"
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:text-purple-600 dark:hover:text-purple-400"
        >
          {t('projects.first')}
        </Button>
        
        <span>•</span>
        
        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          variant="ghost"
          size="sm"
          className="disabled:opacity-50 disabled:cursor-not-allowed hover:text-purple-600 dark:hover:text-purple-400"
        >
          {t('projects.last')}
        </Button>
      </div>
    </motion.div>
  );
}
