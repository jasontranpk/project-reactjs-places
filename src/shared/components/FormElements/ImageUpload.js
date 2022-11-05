import React, { useEffect, useRef, useState } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState();

	const filePickerRef = useRef();
	const pickImageHandler = () => {
		filePickerRef.current.click();
	};
	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);
	const pickedHandler = (e) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		console.log(`${props.id} - ${pickedFile} - ${fileIsValid}`);
		props.onInput(props.id, pickedFile, fileIsValid);
	};
	return (
		<div className='form-control'>
			<input
				ref={filePickerRef}
				id={props.id}
				type='file'
				style={{ display: 'none' }}
				accept='.jpg,.png,.jpeg,.gif,.webp'
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className='image-upload__preview'>
					{previewUrl && <img src={previewUrl} alt='Preview' />}
					{!previewUrl && <p>Please pick an image</p>}
				</div>
				<Button type='button' onClick={pickImageHandler}>
					Pick Image
				</Button>
			</div>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};

export default ImageUpload;
