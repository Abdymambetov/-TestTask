import React from 'react'; 
import { Box, CircularProgress, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import DataTable from './components/Table/Table';

export interface RowData {
	id: number;
	img: string;
	description: string;
	date: string;
	number: number;
}

export interface RootProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
}

export interface Rating {
	rate: number;
	count: number;
}

function App() {
	const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light');
	const [loading, setLoading] = useState(false);
	const toggleTheme = () => {
		const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
		setThemeMode(newThemeMode);
		localStorage.setItem('themeMode', newThemeMode);
	};
	const [rows, setRows] = useState<RowData[]>([]);

	useEffect(() => {
		(async function () {
			setLoading(true);
			const response = await fetch('https://fakestoreapi.com/products/');
			const data = await response.json();
			setRows(
				data.map((item: RootProduct) => ({
					id: item.id,
					img: item.image,
					description: item.description,
					date: new Date().toLocaleString(),
					number: item.rating.rate,
				}))
			);
			setLoading(false);
		})();
	}, []);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: themeMode,
				},
			}),
		[themeMode]
	);
	if (loading)
		return (
			<Box display='flex' justifyContent='center'>
				<CircularProgress />
			</Box>
		);
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					background: 'var(--primary)',
				}}
			>
				<IconButton onClick={toggleTheme} style={{ marginBottom: '10px' }}>
					{themeMode === 'dark' ? <LightMode /> : <DarkMode />}
				</IconButton>
				<Box
					sx={{
						maxWidth: '1000px',
						margin: '0 auto',
					}}
				>
					<DataTable rows={rows} />
				</Box>
			</Box>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default App;
