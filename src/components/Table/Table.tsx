import React from 'react'; 
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import CustomModal from '../Modal/CustomModal';
import cls from './Table.module.css';
import { useSearchParams } from '../../hooks/useSearchParams';
import { RowData } from '../../App';

const DataTable = ({ rows }: { rows: RowData[] }) => {
	const [open, setOpen] = useState(false);
	const [openTextModal, setOpenTextModal] = useState(false);
	const [selectedImg, setSelectedImg] = useState('');
	const [selectedText, setSelectedText] = useState('');
	const { get, set } = useSearchParams();
	const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: get().filter ? [JSON.parse(get().filter ?? '')] : [],
	});

	const [sortModel, setSortModel] = useState<GridSortModel>(
		get().filter ? [] : Object.entries(get()).map(item => ({ field: item[0], sort: item[1] as GridSortDirection }))
	);

	useEffect(() => {
		set(sortModel.reduce((prev, current) => ({ ...prev, [current.field]: current.sort }), {}));
	}, [sortModel]);

	useEffect(() => {
		set(filterModel.items.reduce((_, current) => ({ filter: JSON.stringify(current) }), {}));
	}, [filterModel]);

	const handleImageClick = (img: string) => {
		setSelectedImg(img);
		setOpen(true);
	};

	const handleCellClick = (text: string) => {
		setSelectedText(text);
		setOpenTextModal(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleCloseTextModal = () => {
		setOpenTextModal(false);
	};

	const customCell = (params: GridRenderCellParams) => (
		<div className={cls.customCell} onClick={() => handleCellClick(params.value)}>
			{params.value}
		</div>
	);
	const columns: GridColDef[] = [
		{
			field: 'img',
			headerName: 'Image',
			width: 150,
			renderCell: params => (
				<img
					src={params.value as string}
					alt=''
					style={{ width: 50, height: 50, cursor: 'pointer' }}
					onClick={() => handleImageClick(params.value as string)}
				/>
			),
		},
		{
			field: 'description',
			headerName: 'Description',
			flex: 1,
			headerClassName: cls.header_description,
			cellClassName: cls.description,
			renderCell: customCell,
		},
		{ field: 'date', headerName: 'Date', flex: 1, renderCell: customCell, cellClassName: cls.date, headerClassName: cls.header_date },
		{
			field: 'number',
			headerName: 'Number',
			type: 'number',
			flex: 1,
			renderCell: customCell,
			cellClassName: cls.number,
			headerClassName: cls.header_number,
		},
	];

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				autoHeight
				getRowHeight={() => 'auto'}
				getRowClassName={() => cls.customRow}
				sortModel={sortModel}
				onSortModelChange={newSortModel => setSortModel(newSortModel)}
				filterModel={filterModel}
				onFilterModelChange={newFilterModel => setFilterModel(newFilterModel)}
			/>
			<CustomModal open={open} onClose={handleClose}>
				<img src={selectedImg} alt='' style={{ width: '100%' }} />
			</CustomModal>
			<CustomModal open={openTextModal} onClose={handleCloseTextModal}>
				<p>{selectedText}</p>
			</CustomModal>
		</>
	);
};

export default DataTable;
