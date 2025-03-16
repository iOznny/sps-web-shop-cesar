'use client';
import { useState } from 'react';

interface ProductPaginationProps {
  totalProducts: number;
  fetchProducts: (offset: number) => void;
  itemsPerPage: number;
}

export default function Pagination({ totalProducts, fetchProducts, itemsPerPage }: ProductPaginationProps) {
  const [offset, setOffset] = useState(0);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const currentPage = offset / itemsPerPage + 1;

  /* console.log('totalPages', totalPages)
  console.log('currentPage', currentPage) */

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
    fetchProducts(newOffset);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(offset - itemsPerPage)}
          disabled={offset === 0}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={() => handlePageChange(offset + itemsPerPage)}
          disabled={offset + itemsPerPage >= totalProducts}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Web Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Articulos mostrados {' '}
            <span className="font-medium">{ itemsPerPage }</span> de {' '}
            <span className="font-medium">{ totalProducts }</span> resultados
          </p>
        </div>

        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <button
              onClick={() => handlePageChange(offset - itemsPerPage)}
              disabled={offset === 0}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>

            <button
              onClick={() => handlePageChange(offset + itemsPerPage)}
              disabled={offset + itemsPerPage >= totalProducts}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Siguiente
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
