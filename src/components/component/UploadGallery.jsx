'use client'

import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { addDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CoverUpload } from './cover-upload';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';
import { DatePicker} from './DatePicker';
import { HourPicker } from './hour-picker';
import { salones } from '@/app/data/salones';
import SelectSalon from '@/components/component/select-salon'



const EventForm = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [detailImages, setDetailImages] = useState([]);
    const [category, setCategory] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [isOnSale, setIsOnSale] = useState(false);
    const [listPrice, setListPrice] = useState('');
    const [transferPrice, setTransferPrice] = useState('');
    const [installments, setInstallments] = useState('');
    const [email, setEmail] = useState('')


    const fetchProducts = async () => {
        try {
            const eventRef = collection(db, 'clientes');
            const querySnapshot = await getDocs(eventRef);
            const eventData = [];

            querySnapshot.forEach((doc) => {
                eventData.push({ id: doc.id, ...doc.data() });
            });

            setClientes(eventData);
        } catch (error) {
            console.error('Error fetching clientes: ', error);
        }
    };


    useEffect(() => {

        fetchProducts();
    }, []);

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleDetailImagesChange = (e) => {
        const images = Array.from(e.target.files);
        setDetailImages(images);
    };


    const handleCreateProduct = async () => {
        try {
            const eventRef = collection(db, 'clientes');

            const newEvent = {
                nombre,
                email,
                fecha
            };

     
            const docRef = await addDoc(eventRef, newEvent);


            if (coverImage) {
                const storageRef = ref(storage, `images/${docRef.id}/${coverImage.name}`);
                await uploadBytes(storageRef, coverImage);
                newEvent.fotoPortada = await getDownloadURL(storageRef);
                console.log(newEvent.fotoPortada)
            }

            // Upload detail images
            const detailImageUrls = await Promise.all(
                detailImages.map(async (detailImage) => {
                    const detailStorageRef = ref(storage, `images/${docRef.id}/${detailImage.name}`);
                    await uploadBytes(detailStorageRef, detailImage);
                    return getDownloadURL(detailStorageRef);
                })
            );

            newEvent.fotosDetalles = detailImageUrls;

            // Update the Firestore document with image URLs using setDoc with the merge option
            await setDoc(docRef, newEvent, { merge: true });

            // Clear form fields
            setNombre('');
            setDescription('');
            setPrice('');
            setStock('');
            setCoverImage(null);
            setDetailImages([]);
            fetchProducts();


        } catch (error) {
            console.error('Error creating product: ', error);
        }
    };


    return (
        <div className="bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl text-center font-semibold p-6 pt-12">Invitacion Interactiva</h2>

            <p className='mx-4 pb-8 text-center border-b border-gray-300 mb-4 '>Te invitamos a completar toda la información necesaria para generar tu invitación interactiva. <br /> Les recomendamos mirar <Link className='underline' href={'https://invitacionesjanos.com.ar/6/muestraboda'}> <strong> Este ejemplo </strong> </Link> para entender cómo es el servicio y cómo queda organizada la información dentro de la tarjeta.</p>
            <form onSubmit={handleCreateProduct}>
              <div className="space-y-4 px-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="tumail@ejemplo.com" required type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre:</Label> <span className='text-sm text-gray-500'>Como quieran que aparezca en la invitacion </span>
                  
                  <Input id="nombre" required placeholder='ej: Agus o Agustina' type="text" onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className='space-y-2'>

                <Label htmlFor="nombre">Fecha y Hora: </Label> <span className='text-sm text-gray-500'>Elegí la fecha y hora del evento </span>
                <DatePicker setFecha={setFecha}/>
                <HourPicker />
                </div>
              </div>
            </form>

            <div className='mt-5'>

                <CoverUpload setCoverImage={setCoverImage} coverImage={coverImage}/>
            </div>


            <SelectSalon salones={salones}/>


{/* 
            <div className="mb-4">
                <label htmlFor="detailImages" className="block text-gray-700">
                    Mas Imágenes
                </label>
                <input
                    type="file"
                    id="detailImages"
                    multiple
                    onChange={handleDetailImagesChange}
                    className="w-full"
                />
            </div> */}



            <button
                onClick={handleCreateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                Crear Invitación
            </button>



        </div>
    );
};

export default EventForm;