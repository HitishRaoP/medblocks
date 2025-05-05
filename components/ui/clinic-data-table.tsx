'use client';

import { LucideIcon, } from 'lucide-react';
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
	icon: React.JSX.Element
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	title: string;
	count: number;
	searchKey: string;
	searchPlaceholder?: string;
	redirectPath?: ({ row }: { row?: Row<TData> }) => string;
	addButton?: React.JSX.Element
	facet?: {
		facetKey: string;
		facetOptions: string[];
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
	facet
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
					<div className="bg-muted rounded-md p-1 shadow">{icon}</div>
					<h1 className="text-xl font-semibold">
						{count} {title}
						{count > 0 ? 's' : ''}
					</h1>
				</div>
				{
					addButton ? addButton : null
				}
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
					{
						facet ?
							<DataTableFacetedFilter
								title={facet.facetKey}
								column={table.getColumn(facet.facetKey)}
								options={facet.facetOptions.map((w) => ({
									value: w,
									label: w,
								}))}
							/> : null
					}
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
