// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  Squares2X2Icon,
  TableCellsIcon,
  PencilIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import Pagination from '../../components/Pagination'

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
  { value: 'out_of_stock', label: 'Out of Stock' },
]

const statusStyles = {
  active: 'bg-green-500/10 text-green-400 ring-green-500/20',
  draft: 'bg-gray-500/10 text-gray-400 ring-gray-500/20',
  archived: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
  out_of_stock: 'bg-red-500/10 text-red-400 ring-red-500/20',
}

const products = [
  {
    id: 1,
    name: 'Elegant Evening Gown',
    image: 'https://picsum.photos/seed/vp1/100/100',
    category: 'Dresses',
    price: '$289',
    stock: 12,
    status: 'active',
    views: 1243,
    reservations: 18,
  },
  {
    id: 2,
    name: 'Classic Navy Suit',
    image: 'https://picsum.photos/seed/vp2/100/100',
    category: 'Suits',
    price: '$450',
    stock: 8,
    status: 'active',
    views: 892,
    reservations: 11,
  },
  {
    id: 3,
    name: 'Silk Cocktail Dress',
    image: 'https://picsum.photos/seed/vp3/100/100',
    category: 'Dresses',
    price: '$320',
    stock: 5,
    status: 'active',
    views: 1567,
    reservations: 24,
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    image: 'https://picsum.photos/seed/vp4/100/100',
    category: 'Bags',
    price: '$120',
    stock: 20,
    status: 'active',
    views: 634,
    reservations: 7,
  },
  {
    id: 5,
    name: 'Pearl Drop Earrings',
    image: 'https://picsum.photos/seed/vp5/100/100',
    category: 'Jewelry',
    price: '$85',
    stock: 30,
    status: 'draft',
    views: 0,
    reservations: 0,
  },
  {
    id: 6,
    name: 'Velvet Blazer',
    image: 'https://picsum.photos/seed/vp6/100/100',
    category: 'Outerwear',
    price: '$275',
    stock: 6,
    status: 'active',
    views: 412,
    reservations: 5,
  },
  {
    id: 7,
    name: 'Bohemian Maxi Dress',
    image: 'https://picsum.photos/seed/vp7/100/100',
    category: 'Dresses',
    price: '$175',
    stock: 0,
    status: 'archived',
    views: 2103,
    reservations: 32,
  },
  {
    id: 8,
    name: 'Minimalist Watch',
    image: 'https://picsum.photos/seed/vp8/100/100',
    category: 'Accessories',
    price: '$195',
    stock: 15,
    status: 'active',
    views: 789,
    reservations: 9,
  },
  {
    id: 9,
    name: 'Cashmere Scarf',
    image: 'https://picsum.photos/seed/vp9/100/100',
    category: 'Accessories',
    price: '$145',
    stock: 22,
    status: 'active',
    views: 534,
    reservations: 6,
  },
  {
    id: 10,
    name: 'Suede Ankle Boots',
    image: 'https://picsum.photos/seed/vp10/100/100',
    category: 'Footwear',
    price: '$210',
    stock: 0,
    status: 'out_of_stock',
    views: 1890,
    reservations: 28,
  },
  {
    id: 11,
    name: 'Linen Summer Shirt',
    image: 'https://picsum.photos/seed/vp11/100/100',
    category: 'Tops',
    price: '$95',
    stock: 18,
    status: 'active',
    views: 367,
    reservations: 4,
  },
  {
    id: 12,
    name: 'Structured Tote Bag',
    image: 'https://picsum.photos/seed/vp12/100/100',
    category: 'Bags',
    price: '$160',
    stock: 10,
    status: 'draft',
    views: 0,
    reservations: 0,
  },
]

export default function Products() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Products</h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{filteredProducts.length} products</p>
            </div>
            <Link
              to="/vendor/products/create"
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              <PlusIcon className="size-4" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
              className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex rounded-md border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 ${
                  viewMode === 'table'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                } rounded-l-md`}
              >
                <TableCellsIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                } rounded-r-md`}
              >
                <Squares2X2Icon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-white dark:bg-gray-900 px-6 py-24">
            <ShoppingBagIcon className="size-16 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No products yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add your first product to start receiving reservations
            </p>
            <Link
              to="/vendor/products/create"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              <PlusIcon className="size-4" />
              Add Product
            </Link>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && filteredProducts.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-xl bg-white dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Reservations
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-10 rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {product.price}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className={`size-2 rounded-full ${
                              product.stock > 10
                                ? 'bg-green-400'
                                : product.stock > 0
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                            }`}
                          />
                          <span
                            className={
                              product.stock > 10
                                ? 'text-green-400'
                                : product.stock > 0
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                            }
                          >
                            {product.stock}
                          </span>
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            statusStyles[product.status]
                          }`}
                        >
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {product.views.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {product.reservations}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <Menu as="div" className="relative inline-block text-left">
                          <MenuButton className="rounded-md p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white">
                            <EllipsisVerticalIcon className="size-5" />
                          </MenuButton>
                          <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <Link
                                  to={`/vendor/products/${product.id}/edit`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5 data-[focus]:text-gray-900 dark:data-[focus]:text-white"
                                >
                                  <PencilIcon className="size-4" />
                                  Edit
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5 data-[focus]:text-gray-900 dark:data-[focus]:text-white"
                                >
                                  <ArchiveBoxIcon className="size-4" />
                                  Archive
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5"
                                >
                                  <TrashIcon className="size-4" />
                                  Delete
                                </button>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && filteredProducts.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="rounded-xl bg-white dark:bg-gray-900 p-4">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  <span
                    className={`absolute right-2 top-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      statusStyles[product.status]
                    }`}
                  >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{product.price}</span>
                    <span className={`inline-flex items-center gap-1 text-xs ${
                      product.stock > 10
                        ? 'text-green-400'
                        : product.stock > 0
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    }`}>
                      <span className={`size-1.5 rounded-full ${
                        product.stock > 10
                          ? 'bg-green-400'
                          : product.stock > 0
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
                      }`} />
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/vendor/products/${product.id}/edit`}
                    className="flex-1 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-2 text-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 dark:bg-white/5 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                  >
                    <EllipsisVerticalIcon className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
