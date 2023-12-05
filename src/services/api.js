import axios from 'axios';

const URL = 'http://localhost:4444';

// api to register new user
export const registerUser = async (data) => {
	try {
		console.log('register user triggered');
		console.log(data);
		const response = await axios
			.post(`${URL}/register`, {
				name: data.name,
				email: data.email,
				password: data.password,
			})
		console.log(response.data);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to login existing user
export const loginUser = async (data) => {
	try {
		const response = await axios.post(`${URL}/login`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to create new document
export const saveNewCode = async (data, token) => {
	try {
		const response = await axios.post(`${URL}/new`, data, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to get saved document
export const getSavedDocument = async (id) => {
	try {
		const response = await axios.get(`${URL}/${id}`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to get all documents
export const getAllDocuments = async (token) => {
	try {
		const response = await axios.get(`${URL}/codes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to delete specific document
export const deleteDocument = async (id, token) => {
	try {
		const response = await axios.delete(`${URL}/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// api to delete user
export const deleteUser = async (token) => {
	try {
		const response = await axios.delete(`${URL}/delete`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
