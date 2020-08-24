//IMPORTS ------------------------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import './styles.css';
import api from './services/api';

//HANDLING DATA ------------------------------------------------------------------------------------
function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: 'Teste do Front-End!',
			url:
				'https://github.com/vitor-saldanha/bootcamp-rocketseat/tree/master/modulo_1',
			techs: ['Node', 'ReactJS'],
		});
		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(id) {
		api.delete(`repositories/${id}`);
		const newRepositories = repositories.filter(
			(repository) => repository.id !== id
		);
		setRepositories(newRepositories);
	}

	//COMPONENTS -------------------------------------------------------------------------------------
	return (
		<div>
			<ul data-testid='repository-list'>
				{repositories.map((repo) => (
					<>
						<li key={repo.id}> {repo.title} </li>
						<button onClick={() => handleRemoveRepository(repo.id)}>
							Remover
						</button>
					</>
				))}
			</ul>
			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
