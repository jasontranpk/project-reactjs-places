import { useState, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const authCtx = useContext(AuthContext);
	const [showMap, setShowMap] = useState(false);
	const [showDeleteWarning, setShowDeleteWarning] = useState(false);
	const openMapHandler = () => {
		setShowMap(true);
	};
	const closeMapHandler = () => {
		setShowMap(false);
	};
	const openDeleteWarning = () => {
		setShowDeleteWarning(true);
	};
	const closeDeleteWarning = () => {
		setShowDeleteWarning(false);
	};
	const confirmDeleteHandler = async () => {
		setShowDeleteWarning(false);
		try {
			await sendRequest(
				'http://localhost:8000/api/places/' + props.id,
				'DELETE',
				null,
				{
					Authorization: 'Bearer ' + authCtx.token,
				}
			);
			props.onDelete(props.id);
		} catch (err) {}
	};
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass='place-item__modal-content'
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className='map-container'>
					<Map center={props.coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showDeleteWarning}
				onCancel={closeDeleteWarning}
				header='Are you sure?'
				footerClass='place-item__modal-actions'
				footer={
					<>
						<Button onClick={closeDeleteWarning}>CANCEL</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</>
				}
			>
				<p>
					Do you want to proceed and delete this place? Please note
					that it can't be undone thereafter?
				</p>
			</Modal>
			<li className='place-item'>
				<Card className='place-item__content'>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className='place-item__image'>
						<img
							src={`http://localhost:8000/${props.image}`}
							alt={props.title}
						/>
					</div>
					<div className='place-item__info'>
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className='place-item__actions'>
						<Button inverse onClick={openMapHandler}>
							VIEW ON MAP
						</Button>
						{authCtx.userId === props.creatorId && (
							<>
								<Button to={`/places/${props.id}`}>EDIT</Button>
								<Button danger onClick={openDeleteWarning}>
									DELETE
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
