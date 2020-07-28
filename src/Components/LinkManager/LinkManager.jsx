import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
	getLinks,
	updateCache,
	slugExists,
	removeLink,
} from '../../storage/storageControls';
import { createLink, deleteLink } from '../../api/apiControls';
import { ORANGE, CREAM, GREY } from 'Styles/themes';

export const LinkManager = () => {
	let inputRef = useRef(null);
	const [cache, setCache] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!localStorage.hasOwnProperty('links')) {
			localStorage.setItem('links', '[]');
		} else {
			setCache(getLinks());
		}
	}, [localStorage]);

	const useForm = submissionActionCallback => {
		const [inputs, setInputs] = useState({});

		const handleSubmit = event => {
			event.preventDefault();

			submissionActionCallback(inputs);
		};

		const handleInputChange = event => {
			event.persist();

			setInputs(inputs => ({
				...inputs,
				[event.target.name]: event.target.value,
			}));
		};

		return {
			handleInputChange,
			handleSubmit,
		};
	};

	const { handleInputChange, handleSubmit } = useForm(submitLink);

	async function submitLink({longLink, customSlug}) {
		if (slugExists(customSlug, cache)) {
			setError(`${customSlug} has already been taken`);
		} else {
			const newLink = await createLink(longLink, customSlug, );
			if (newLink.error) {
				setError(newLink.result);
			} else {
				console.log(newLink);
				updateCache(newLink.result, cache);
				setCache(getLinks());
			}
		}
	}

	function expireLink(link) {
		removeLink({ slug: link.slug, cache });

		setCache(getLinks());
	}

	return (
		<LinkManagerStyles className='link-manager-background'>
			<div className='link-manager-container'>
				<form className='new-link-form' onSubmit={handleSubmit}>
					<div className='new-link-form-container'>
						<div className='long-link-input-container'>
							<input
								type='text'
								pattern='^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$'
								className='long-link-input'
								placeholder='Take a bite out of that link!'
								required={true}
								onChange={handleInputChange}
								autoComplete='off'
								name='longLink'
							/>
						</div>
						<div className='custom-input-container'>
							<input
								autoComplete='off'
								className='custom-input'
								placeholder='/custom'
								ref={inputRef}
								type='text'
								onChange={handleInputChange}
								name='customSlug'
							/>
						</div>
						<div className='shorten-button-container'>
							<button type='submit' children='Shorten' />
						</div>
					</div>
				</form>
				<div className='most-recent-links-container'>
					<ul className='link-list'>
						<li className='link'>
							<div className='link-details'>
								<div className='long-link-container'>
									<span className='long-link'>NemKaldi.com </span>
								</div>
								<div className='expiration-container'>
									<span className='expiration-timer'>Expires in: 4:20</span>
									<button
										className='expire-link-button'
										children='Expire Now'
										onClick={expireLink}
									/>
								</div>
								<div className='copy-container'>
									<span>
										<a
											href='${long-url}'
											className='short-link'
											target='_blank'
											title='shortened-url ${long-url}'>
											nem.com
										</a>
									</span>
									<span className='copy-button-container'>
										<button
											className='copy-button'
											type='copy'
											children='Copy'
										/>
									</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</LinkManagerStyles>
	);
};

const LinkManagerStyles = styled.div`
	background-color: ${ORANGE};
	padding: 1em 0;
	font-size: 1.5rem;
	min-width: 800px;

	.link-manager-container {
		min-width: 500px;

		margin: 0 auto;
		width: 70%;

		@media (min-width: 800px) {
			min-width: 800px;
		}
	}

	.new-link-form {
		width: 100%;

		.new-link-form-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1em;

			@media (min-width: 800px) {
				flex-direction: row;
			}

			.long-link-input-container {
				display: flex;
				width: 90%;

				.long-link-input {
					width: 99%;
					font-size: 2rem;
					padding: 0.3em 0.5em;
					border-radius: 0.3em;
					border-right: solid 1px ${ORANGE};
					box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

					@media (min-width: 800px) {
						border-bottom-right-radius: 0;
						border-top-right-radius: 0;
					}
				}
			}

			.custom-input-container {
				display: flex;
				width: 40%;
				margin: 0.5em;

				@media (min-width: 800px) {
					margin: 0;
				}

				.custom-input {
					width: 90%;
					font-size: 2rem;
					padding: 0.3em;
					text-align: left;
					border-radius: 0.3em;
					border-left: solid 1px ${ORANGE};
					box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

					@media (min-width: 800px) {
						border-bottom-left-radius: 0;
						border-top-left-radius: 0;
					}
				}

				.enable-custom-input {
					width: 10%;
				}
			}

			.shorten-button-container {
				display: flex;
				width: 90%;

				@media (min-width: 800px) {
					width: 20%;
				}

				button {
					width: 100%;
					background: ${CREAM};
					padding: 0.3em;
					color: ${ORANGE};
					font-size: 2rem;
				}
			}
		}
	}

	.most-recent-links-container {
		display: flex;
		position: absolute;
		flex-direction: column;
		background-color: white;
		border-radius: 0.3em;
		border: 3px solid ${ORANGE};

		@media (min-width: 800px) {
			position: relative;
			width: 100%;
			border: none;
		}

		.link-list {
			border-radius: 0.3em;
			list-style: none;
			padding-left: 0;

			.link-list:last-child {
				border: none;
			}

			.link {
				margin: 0 auto;
				padding: 1em 0;
				border-bottom: solid 1px ${GREY};

				@media (min-width: 800px) {
					margin: 0;
				}
			}

			.link-details {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;

				@media (min-width: 800px) {
					flex-direction: row;
					align-items: baseline;
				}
			}

			.long-link-container {
				.long-link {
					font-size: 2.5rem;

					@media (min-width: 800px) {
						font-size: 1.5rem;
					}
				}
			}

			.expiration-container {
				display: flex;
				justify-content: space-between;
				font-size: 2.5rem;

				@media (min-width: 800px) {
					font-size: 1.5rem;
				}

				.expiration-timer {
					font-size: 1.5rem;
					text-align: center;
					white-space: nowrap;
					margin: 1em;
				}

				.expire-link-button {
					font-size: 1rem;
					background: ${CREAM};
					color: ${ORANGE};
					padding: 0.5em;
					margin: 1em auto;
					white-space: nowrap;
					text-align: center;
				}
			}

			.copy-container {
				display: flex;
				justify-content: space-between;
				align-items: baseline;

				.short-link {
					font-size: 3rem;
					margin: 1em;

					@media (min-width: 800px) {
						font-size: 1.5rem;
					}
				}

				.copy-button {
					font-size: 3rem;
					background: ${CREAM};
					color: ${ORANGE};
					padding: 0 2em;
					margin: 0 auto;

					@media (min-width: 800px) {
						font-size: 1.5rem;
						padding: 0.5em;
					}
				}
			}
		}
	}
`;
