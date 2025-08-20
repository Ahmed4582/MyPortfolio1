import React from "react";
import { Monitor, ShoppingCart, Palette, Layout, Smartphone } from "lucide-react";

export function getCategoryIcon (category: string) {
  switch (category) {
    case 'dashboard': return <Monitor className="h-5 w-5" />;
    case 'ecommerce': return <ShoppingCart className="h-5 w-5" />;
    case 'portfolio': return <Palette className="h-5 w-5" />;
    case 'landing': return <Layout className="h-5 w-5" />;
    case 'webapp': return <Monitor className="h-5 w-5" />;
    case 'mobile': return <Smartphone className="h-5 w-5" />;
    default: return <Monitor className="h-5 w-5" />; 
  }
}

export function getCategoryColor (category: string) {
  switch (category) {
    case 'dashboard': return 'from-orange-500 to-red-500';
    case 'ecommerce': return 'from-green-500 to-emerald-500';
    case 'portfolio': return 'from-purple-500 to-pink-500';
    case 'landing': return 'from-indigo-500 to-purple-500';
    case 'webapp': return 'from-blue-500 to-cyan-500';
    case 'mobile': return 'from-violet-500 to-purple-500';
    default: return 'from-gray-500 to-gray-600';
  }
}

export function getComplexityColor (complexity: string) { 
  switch (complexity) {
    case 'beginner': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700';
    case 'intermediate': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  }
}  
