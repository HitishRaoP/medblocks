"use client"

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	type Row,
	useReactTable,
} from "@tanstack/react-table"
import React from "react"
import { DataTablePagination } from "./data-table-pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { useNavigate } from "react-router-dom";
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Input } from "./input"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "./button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"

interface ClinicDatatableProps<TData, TValue> {
	icon: React.JSX.Element
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	title: string
	count: number
	searchKey: string
	searchPlaceholder?: string
	redirectPath?: ({ row }: { row?: Row<TData> }) => string
	addButton?: React.JSX.Element
	facet?: {
		facetKey: string
		facetOptions: string[]
	}
}

export const ClinicDatatable = <TData, TValue>({
	icon,
	data,
	count,
	title,
	columns,
	searchKey,
	searchPlaceholder,
	redirectPath,
	addButton,
	facet,
}: ClinicDatatableProps<TData, TValue>) => {
	const navigate = useNavigate();
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const table = useReactTable({
		data,
		columns,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	})

	return (
		<div className="mx-auto rounded-lg">
			{/**
       * Header
       */}
			<div className="mb-6 flex items-center justify-between rounded-lg">
				<div className="flex items-center gap-2">
					<div className="bg-muted rounded-md p-1 shadow">{icon}</div>
					<h1 className="text-xl font-semibold">
						{count} {title}
						{count > 0 ? "s" : ""}
					</h1>
				</div>
				{addButton ? addButton : null}
			</div>

			{/**
       * Data-table
       */}
			<div className="overflow-hidden rounded-md border">
				{/* Desktop filters */}
				<div className="hidden md:flex items-center justify-between p-4 gap-4 flex-wrap">
					<div className="relative w-full md:max-w-sm">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={`Search ${searchPlaceholder ? searchPlaceholder : searchKey}s...`}
							value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
							onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
							className="w-full pl-8"
						/>
					</div>

					<div className="flex items-center gap-2 ml-auto">
						{facet ? (
							<DataTableFacetedFilter
								title={facet.facetKey}
								column={table.getColumn(facet.facetKey)}
								options={facet.facetOptions.map((w) => ({
									value: w,
									label: w,
								}))}
							/>
						) : null}

						<DataTableViewOptions table={table} />
					</div>
				</div>

				{/* Mobile filters */}
				<div className="md:hidden p-4 flex items-center justify-between gap-2">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={`Search...`}
							value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
							onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
							className="w-full pl-8"
						/>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="h-9 w-9">
								<SlidersHorizontal className="h-4 w-4" />
								<span className="sr-only">Filter options</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right">
							<SheetHeader>
								<SheetTitle>Filters & View Options</SheetTitle>
								<SheetDescription>Customize your table view and filters</SheetDescription>
							</SheetHeader>
							<div className="flex flex-col gap-6 py-6 px-4">
								{facet ? (
									<div className="space-y-2">
										<h3 className="text-sm font-medium">Filter by {facet.facetKey}</h3>
										<DataTableFacetedFilter
											title={facet.facetKey}
											column={table.getColumn(facet.facetKey)}
											options={facet.facetOptions.map((w) => ({
												value: w,
												label: w,
											}))}
										/>
									</div>
								) : null}

								<div className="space-y-2">
									<h3 className="text-sm font-medium">Column Visibility</h3>
									<div className="flex flex-col gap-2">
										{table
											.getAllColumns()
											.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
											.map((column) => {
												return (
													<div key={column.id} className="flex items-center space-x-2">
														<input
															type="checkbox"
															id={`column-${column.id}`}
															checked={column.getIsVisible()}
															onChange={(e) => column.toggleVisibility(e.target.checked)}
															className="h-4 w-4 rounded border-gray-300"
														/>
														<label htmlFor={`column-${column.id}`} className="text-sm capitalize">
															{column.id}
														</label>
													</div>
												)
											})}
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				<Table className="w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="bg-muted border px-4 py-2">
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header?.toString().toUpperCase(), header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								const path = redirectPath?.({ row })

								return (
									<TableRow
										{...(path ? { onClick: () => navigate(path) } : {})}
										className={`${redirectPath ? "cursor-pointer" : ""} border`}
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="border px-4 py-2">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 border text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<DataTablePagination table={table} />
			</div>
		</div>
	)
}
