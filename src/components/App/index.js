import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.scss';

const App = () => {

	// Armaxena as raças de cachorros e altera o valor delas
	const [breeds, setbreeds] = useState(null);

	// Busca as raças de cachorros
	useEffect(() => {
		const getDogsBreeds = async () => {
			const response = await api.get('/breeds/list/all');
			const dogsBreeds = Object.keys(response.data.message);

			setbreeds(dogsBreeds);
		};

		getDogsBreeds();
	}, []);

	// Armazena a raça selecionada
	const [selectedBreed, setSelectedBreed] = useState(null);

	// Pega a opção selecionada pelo usuário
	const handleBreedsSelection = (event) => {
		const selectedBreed = event.target.value;

		setSelectedBreed(selectedBreed);
		setDogName({});
	};

	// Armazena a informação do cachorro vindo da escolha do usuário
	const [dogImageFromBreed, setdogImageFromBreed] = useState(null);

	// Busca um cachorro com base na raça selacionada
	useEffect(() => {
		const getDogFromBreed = async (userSelectedBreed) => {
			const response = await api.get(`/breed/${userSelectedBreed}/images/random/3`);
			const dogImage = response.data.message;

			console.log('getDogFromBreed', dogImage);

			setdogImageFromBreed(dogImage);
		};

		if (selectedBreed) {
			getDogFromBreed(selectedBreed);
		}
	}, [selectedBreed]);


	// Armazena o nome digitado pelo usuário
	const [dogName, setDogName] = useState({});

	// Assiste o nome que o usuário está digitando
	const changeDogName = (event, id) => {
		const name = event.target.value;

		setDogName({
			...dogName,
			[id]: name
		});
	};

	// Selecionar as cores
	const colorsOptions = [
		{id: 0, hex: '#000000', name: 'Preto'   },
		{id: 1, hex: '#FF5733', name: 'Vermelho'},
		{id: 2, hex: '#8E44AD', name: 'Roxo'    },
		{id: 3, hex: '#3498DB', name: 'Azul'    },
		{id: 4, hex: '#1ABC9C', name: 'Verde'   },
		{id: 5, hex: '#F1C40F', name: 'Amarelo' }
	];

	return (
		<div className="App">
			<div className="container">
				{breeds && (
					<>
						<h1 className="title">Selecione a raça do cachorro</h1>

						<form action="#" className="form">
							<select onChange={handleBreedsSelection} defaultValue="default">
								<option value="default" disabled>Selecione uma raça de cachorro</option>

								{breeds.map(dogBred => (
									<option key={dogBred} value={dogBred}>
										{dogBred}
									</option>
								))}
							</select>
						</form>
					</>
				)}

				<br/>

				{dogImageFromBreed && (
					<>
						<h2 className="title">Esse foi o cachorro encontrado</h2>

						<div className="dog-image-container">
							{dogImageFromBreed.map((dogImage, idx) => (
								<div key={idx} className="dog-image-container__item">
									<div className="dog-image-card">
										<img
											className="dog-image"
											src={dogImage}
											alt={dogName && dogName[idx] ? dogName[idx] : ''}
										/>

										{dogName && (
											<h3 className="dog-name">{dogName[idx]}</h3>
										)}
									</div>

									<div className="information-container">
										<form action="#" className="form">
											<div>
												<label>Raça do cachorro:</label>
												<input
													type="text"
													name={selectedBreed}
													id={selectedBreed}
													value={selectedBreed}
													disabled
												/>
											</div>

											<div>
												<label>Nome do cachorro:</label>
												<input
													id={idx}
													type="text"
													onChange={e => changeDogName(e, idx)}
													name={dogName && dogName[idx] ? dogName[idx] : ''}
													value={dogName && dogName[idx] ? dogName[idx] : ''}
												/>
											</div>

											<div>
												<label>Cor da fonte:</label>
												<select defaultValue="default">
													<option value="default" disabled>Selecione uma cor:</option>

													{colorsOptions.map(color => (
														<option key={color.id} value={color.hex}>
															{color.name}
														</option>
													))}
												</select>
											</div>


										</form>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
