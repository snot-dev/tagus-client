import axios from "axios";

const setHeaders =  () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
	const headers = {
		"Access-Control-Allow-Origin": "*",
		'Accept': 'application/json'
	};

    if (user) {
        headers['Authorization'] =  `Bearer ${user}`;
	} 

	return headers;
};

const instance = axios.create( {
	baseURL: '/tagus/api/',
	withCredentials: true,
	headers: setHeaders()
});

const update = token => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export  {
	instance as default,
	update
};