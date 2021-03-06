import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Clipboard from 'clipboard';
import {
	getLinks,
	updateCache,
	slugExists,
	removeLink,
	separateExpiredLinks,
} from 'Storage/storageControls';
import { createLink, deleteLink } from 'API/apiControls';
import { ORANGE, CREAM, GREY, TEAL } from 'Styles/globalStyles';
import { timeLeft } from 'Utils/utility';

export const LinkManager = () => {
	const [cache, setCache] = useState([]);
	const [error, setError] = useState('');
	let clipboardCopy = new Clipboard('#copy-target');

	useEffect(() => {
		if (!localStorage.hasOwnProperty('links')) {
			localStorage.setItem('links', '[]');
		} else {
			const expiredLinks = separateExpiredLinks(cache);

			setCache(getLinks());

			expiredLinks.forEach(expiredLink => {
				deleteLink(expiredLink.slug);
			});
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

	async function submitLink({ longLink, customSlug }) {
		if (slugExists(customSlug, cache)) {
			setError(`${customSlug} has already been taken`);
		} else {
			const newLink = await createLink(longLink, customSlug);
			if (newLink.error) {
				setError(newLink.result);
			} else {
				updateCache(cache, newLink.result);
				setCache(getLinks());
				setError('');
			}
		}
	}

	async function expireLink(slug) {
		const linkDeletion = await deleteLink(slug);

		if (linkDeletion.error) {
			setError(linkDeletion.result);
		} else {
			removeLink(slug, cache);
			setCache(getLinks());
			setError('');
		}
	}

	return (
		<LinkManagerStyles className='link-manager-background'>
			<div className='link-manager-container'>
				<form className='new-link-form' onSubmit={handleSubmit}>
					<div className='new-link-form-container'>
						<div className='long-link-input-container'>
							<input
								type='text'
								className='long-link-input'
								pattern='^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
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
								type='text'
								onChange={handleInputChange}
								name='customSlug'
								maxLength='15'
							/>
						</div>
						<div className='shorten-button-container'>
							<button type='submit' children='Shorten' />
						</div>
					</div>
				</form>
				<center>
					<span className='error-message'>{error}</span>
				</center>
				<div className='most-recent-links-container'>
					<ul className='link-list'>
						{cache.map(link => {
							return (
								<li className='link' key={link.slug}>
									<div className='link-details'>
										<div className='long-link-container'>
											<span className='long-link'>{link.url}</span>
										</div>
										<div className='expiration-container'>
											<span className='expiration-timer'>
												Expires in: {timeLeft(link.expires_at)}min
											</span>
											<button
												className='expire-link-button'
												children='Expire Now'
												onClick={() => expireLink(link.slug)}
											/>
										</div>
										<div className='copy-container'>
											<span>
												<a
													href={`http://${link.url}`}
													className='short-link'
													target='_blank'
													title='shortened-url'>
													{link.short_url}
												</a>
											</span>
											<span className='copy-button-container'>
												<button
													id='copy-target'
													className='copy-button'
													type='copy'
													children='Copy'
													data-clipboard-text={link.short_url}
												/>
											</span>
										</div>
									</div>
								</li>
							);
						})}
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
		margin: 0 auto;
		width: 100%;

		@media (min-width: 800px) {
			min-width: 800px;
			width: 70%;
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
			}

			.shorten-button-container {
				display: flex;
				width: 90%;
				margin: 0 0.5em;

				@media (min-width: 800px) {
					width: 20%;
				}

				button {
					width: 100%;
					background: ${CREAM};
					padding: 0.3em;
					color: ${ORANGE};
					font-size: 2rem;

					:hover,
					:focus {
						background: ${TEAL};
						color: ${CREAM};
					}
				}
			}
		}
	}

	.error-message {
		color: red;
		margin: 0 auto;
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
				display: flex;
				text-overflow: ellipsis;
				max-width: 200px;

				/* Required for text-overflow to do anything */
				white-space: nowrap;
				overflow: hidden;
				.long-link {
					font-size: 2.5rem;
					text-overflow: ellipsis;
					@media (min-width: 800px) {
						font-size: 1.5rem;
					}
				}
			}

			.expiration-container {
				display: flex;
				justify-content: space-between;
				font-size: 1rem;

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
					font-size: 2.5rem;
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
