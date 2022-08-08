import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { DEFAULT_TAKE } from '../constants/consts';
import { usePagination } from '../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  take?: number;
  href?: string;
}

const totalCount = 250;

export default function Pagination({
  currentPage,
  take = DEFAULT_TAKE,
  href,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize: DEFAULT_TAKE,
  });

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * take + 1}</span>{' '}
            to <span className="font-medium">{currentPage * take}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results.
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {paginationRange?.map((label, index) => (
              <Link
                key={`${label}_${index}`}
                href={
                  href
                    ? `${href}/${label}`
                    : {
                        pathname: '/exercises/week-3/exercise-1',
                        query: { page: label },
                      }
                }
                aria-current="page"
              >
                <a
                  className={`${
                    label === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {label}
                </a>
              </Link>
            ))}

            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
