'use client';
// src/components/dashboard/ItemCard.tsx
import { Item } from '@/lib/types';
import NextImage from 'next/image';
import { CalendarDays, ScanLine, Pencil, Trash2 } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

export default function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const imgSrc = item.imageBase64 || "/placeholder-image.png"; 

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
      <div className="relative w-full h-48 flex-shrink-0">
        <NextImage
          src={imgSrc}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          className="bg-slate-100 dark:bg-slate-700"
          onError={(e) => {
            if (imgSrc !== "/placeholder-image.png") {
              (e.currentTarget as HTMLImageElement).src = "/placeholder-image.png";
            }
          }}
          unoptimized={imgSrc.startsWith('data:image')}
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 truncate" title={item.name}>{item.name}</h3>
          {item.itemCode && (
            <p className="text-xs text-sky-600 dark:text-sky-400 mb-2 flex items-center">
              <ScanLine size={14} className="mr-1.5 flex-shrink-0" /> 
              Code: <span className="font-medium">{item.itemCode}</span>
            </p>
          )}
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 h-16 overflow-y-auto custom-scrollbar">
            {item.description}
          </p>
        </div>
        <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-700">
            {item.createdAt && (
            <div className="text-xs text-slate-500 dark:text-slate-500 flex items-center mb-3">
                <CalendarDays size={14} className="mr-1.5" />
                Added: {new Date(item.createdAt).toLocaleDateString()}
            </div>
            )}
            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-slate-600 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
                    title="Edit item"
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={() => onDelete(item._id)} // item._id is guaranteed by Item type
                    className="p-2 text-slate-600 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                    title="Delete item"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}