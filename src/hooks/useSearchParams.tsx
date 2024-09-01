import React from 'react'; 
import { useState, useEffect, useCallback } from 'react';

type Params = {
	[key: string]: string | null;
};

export const useSearchParams = () => {
	const [searchParams, setSearchParamsState] = useState<URLSearchParams>(() => new URLSearchParams(window.location.search));

	
	useEffect(() => {
		const handlePopState = () => {
			setSearchParamsState(new URLSearchParams(window.location.search));
		};

		window.addEventListener('popstate', handlePopState);
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	const get = useCallback((): Params => {
		const params: Params = {};
		searchParams.forEach((value, key) => {
			params[key] = value;
		});
		return params;
	}, [searchParams]);

	const set = useCallback((params: Params) => {
		const newParams = new URLSearchParams();

		
		Object.entries(params).forEach(([key, value]) => {
			if (value === null) {
				newParams.delete(key);
			} else {
				newParams.set(key, value);
			}
		});

		
		const newUrl = `${window.location.pathname}?${newParams.toString()}`;
		window.history.replaceState({}, '', newUrl);
		setSearchParamsState(newParams);
	}, []);

	
	const clear = useCallback(() => {
		const newUrl = window.location.pathname;
		window.history.replaceState({}, '', newUrl);
		setSearchParamsState(new URLSearchParams());
	}, []);

	return { get, set, clear };
};
