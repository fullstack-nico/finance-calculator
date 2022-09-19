export const serverPost = async (url, req, processDataFromServer, errorFunction, rejectWithValue ) => {
	return await fetch(url,
		{
			method: 'POST',
			headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			body: JSON.stringify(req)
		})
		.then((response) => response.json())
		.then((responseData) => {


			if (responseData.status.status === 'fail'){
				return rejectWithValue(responseData.status.message)
			}
			return processDataFromServer(responseData);

		})
		.catch((error) => {
			console.log(error);
			return errorFunction(error);
		})
};

// api call suitable only for dispatch not for createAsyncThunk
// export const serverPost = (url, req, processDataFromServer, errorFunction ) => {
// 	fetch(url,
// 			{
// 				method: 'POST',
// 				headers:
// 				{
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(req)
// 			})
// 			.then((response) => response.json())
// 			.then((responseData) => {
//
// 				processDataFromServer(responseData);
//
// 			})
// 			.catch((error) => {
// 					console.log(error);
// 					errorFunction(error);
// 			}).done();
// };

export const serverGet = (url, processDataFromServer, error) => {
	fetch(url,
			{
				method: 'GET',
				headers:
				{
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},

			})
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				processDataFromServer(responseData);
			})
			.catch((error) => {
					console.log(error);
			}).done();
};

export const serverUploadImage = (url, name, mime, path, processDataFromServer) => {

	let uploadData = new FormData();
	uploadData.append('submit', 'ok', );
	uploadData.append('file', { type: mime, uri: path, name: name + '.jpg' });

	fetch(url,{
		method: 'post',
		body: uploadData
	}).then(response => response.json())
		.then(responseData => {

			processDataFromServer(responseData);

		}).catch((error) => {

		console.log(error);

	});

};















