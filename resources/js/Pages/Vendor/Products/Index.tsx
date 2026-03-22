import { Head, Link, router, usePage } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { MagnifyingGlassIcon, PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import type { Product, ProductImage, PaginatedResponse, SharedProps } from '@/types'

interface Props {
    products: PaginatedResponse<Product & { primary_image?: ProductImage; category?: { id: number; name: string } }>
    filters: { search?: string; status?: string }
}

const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400',
    draft: 'bg-gray-500/10 text-gray-400',
    out_of_stock: 'bg-red-500/10 text-red-400',
    archived: 'bg-gray-500/10 text-gray-500',
}

const statusTabs = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
]

export default function VendorProductsIndex({ products, filters }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const [search, setSearch] = useState(filters.search || '')
    const [selected, setSelected] = useState<number[]>([])
    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    const toggleSelectAll = () => setSelected(selected.length === products.data.length ? [] : products.data.map(p => p.id))
    const bulkAction = (action: string) => {
        if (selected.length === 0) return
        router.post('/vendor/products/bulk', { ids: selected, action }, { preserveState: true, onSuccess: () => setSelected([]) })
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.get('/vendor/products', { ...filters, search }, { preserveState: true })
    }

    return (
        <VendorLayout>
            <Head title="Products" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                <Link href="/vendor/products/create" className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
                    <PlusIcon className="size-4" /> Add Product
                </Link>
            </div>

            {/* Search + status tabs */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
                    <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-2 pl-9 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600" />
                </form>
                <div className="flex gap-2">
                    {statusTabs.map((tab) => (
                        <button key={tab.value} type="button" onClick={() => router.get('/vendor/products', { ...filters, status: tab.value || undefined, search: filters.search }, { preserveState: true })} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${(filters.status || '') === tab.value ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bulk actions bar */}
            {selected.length > 0 && (
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-primary-600/30 bg-primary-600/5 px-4 py-3">
                    <span className="text-sm font-medium text-primary-600">{selected.length} selected</span>
                    <button type="button" onClick={() => bulkAction('activate')} className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700">Activate</button>
                    <button type="button" onClick={() => bulkAction('deactivate')} className="rounded-md bg-yellow-600 px-3 py-1 text-xs font-semibold text-white hover:bg-yellow-700">Deactivate</button>
                    <button type="button" onClick={() => { if (confirm(`Delete ${selected.length} products?`)) bulkAction('delete') }} className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700">Delete</button>
                    <button type="button" onClick={() => setSelected([])} className="ml-auto text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Clear</button>
                </div>
            )}

            {/* Product table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="w-10 px-4 py-3"><input type="checkbox" checked={selected.length === products.data.length && products.data.length > 0} onChange={toggleSelectAll} className="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" /></th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Product</th>
                            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 sm:table-cell">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
                            <th className="hidden px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400 md:table-cell">Views</th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                        {products.data.length === 0 ? (
                            <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">No products found. <Link href="/vendor/products/create" className="text-primary-600">Add your first product</Link></td></tr>
                        ) : (
                            products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(product.id)} onChange={() => toggleSelect(product.id)} className="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" /></td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {product.primary_image && <img src={product.primary_image.url} alt="" className="size-10 rounded-lg object-cover" />}
                                            <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-500 dark:text-gray-400 sm:table-cell">{product.category?.name}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatPrice(product.price)}</td>
                                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColors[product.status] || ''}`}>{product.status.replace('_', ' ')}</span></td>
                                    <td className="hidden px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400 md:table-cell">{product.views_count}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Menu as="div" className="relative inline-block">
                                            <MenuButton className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><EllipsisVerticalIcon className="size-5" /></MenuButton>
                                            <MenuItems className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none">
                                                <div className="py-1">
                                                    <MenuItem><Link href={`/vendor/products/${product.id}/edit`} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Edit</Link></MenuItem>
                                                    <MenuItem><button type="button" onClick={() => router.put(`/vendor/products/${product.id}`, { status: product.status === 'active' ? 'draft' : 'active' }, { preserveScroll: true })} className="block w-full px-4 py-2 text-left text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">{product.status === 'active' ? 'Deactivate' : 'Activate'}</button></MenuItem>
                                                    <MenuItem><button type="button" onClick={() => { if (confirm('Delete this product?')) router.delete(`/vendor/products/${product.id}`, { preserveScroll: true }) }} className="block w-full px-4 py-2 text-left text-sm text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Delete</button></MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {products.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {products.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                    ))}
                </div>
            )}
        </VendorLayout>
    )
}
