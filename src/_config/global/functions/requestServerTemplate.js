// // URL of server request controller
// 		const URL = URL_LOGIN;
//
// // What data to send
// 		var req =
// 		{
// 			keyMasterApp: KEY_MASTER_APP,
// 			epm_email: email,
// 			epm_password: password,
// 			ndm_notification_token: 'Sdmfr34enf-545jgtmr423gjoejgt',
// 		};
//
// //	What to do with the received data
// 		const processDataFromServer = (responseData) => {
//
// 			if (responseData.status.status === 'fail'){
// 				authLoginFail(dispatch, responseData.status.message);
// 			}
// 			else if (responseData.status.status === 'success') {
// 					authLoginSuccess(dispatch, responseData.data.data);
// 			}
// 			else{
// 				alert("login properly please");
// 			}
// 		};
//
// // 	If there is error, what to do
// 		const error = (error) => {
// 			console.log(error);
// 		};
//
// 		// Post to server
// 		serverPost(URL, req, processDataFromServer, error);
