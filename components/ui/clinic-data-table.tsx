'use client';

import { Plus, Users } from 'lucide-react';
import { Button } from './button';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	Row,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { DataTablePagination } from './data-table-pagination';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './table';
import { redirect } from 'next/navigation';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Input } from './input';

interface ClinicDatatableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	title: string;
	count: number;
	searchKey: string;
	searchPlaceholder?: string;
	facetKey: string;
	facetOptions: string[];
	redirectPath?: ({ row }: { row?: Row<TData> }) => string;
}

export const ClinicDatatable = <TData, TValue>({
	data,
	count,
	title,
	columns,
	searchKey,
	searchPlaceholder,
	facetKey,
	facetOptions,
	redirectPath,
}: ClinicDatatableProps<TData, TValue>) => {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
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
	});

	return (
		<div className="mx-auto rounded-lg">
			{/**
			 * Header
			 */}
			<div className="mb-6 flex items-center justify-between rounded-lg">
				<div className="flex items-center gap-2">
					<Users className="bg-muted rounded-md p-1 shadow" size={34} />
					<h1 className="text-xl font-semibold">
						{count} {title}
						{count > 0 ? 's' : ''}
					</h1>
				</div>
				<Button className="gap-2 bg-indigo-500 text-white hover:bg-indigo-600">
					<Plus className="h-4 w-4" />
					<span className="hidden sm:flex">Add {title}</span>
				</Button>
			</div>

			{/**
			 * Data-table
			 */}
			<div className="overflow-hidden rounded-md border">
				<div className="flex items-center gap-4 p-4">
					<Input
						placeholder={`Search ${searchPlaceholder ? searchPlaceholder : searchKey}s...`}
						value={
							(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn(searchKey)?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DataTableFacetedFilter
						title={facetKey}
						column={table.getColumn(facetKey)}
						options={facetOptions.map((w) => ({
							value: w,
							label: w,
						}))}
					/>
					<DataTableViewOptions table={table} />
				</div>
				<Table className="w-full">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="bg-muted border px-4 py-2"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header
														?.toString()
														.toUpperCase(),
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => {
								const path = redirectPath?.({ row });

								return (
									<TableRow
										{...(path ? { onClick: () => redirect(path) } : {})}
										className="cursor-pointer border"
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="border px-4 py-2">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 border text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<DataTablePagination table={table} />
			</div>
		</div>
	);
};
