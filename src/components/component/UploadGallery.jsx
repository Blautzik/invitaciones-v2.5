'use client'

import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { addDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CoverUpload } from './cover-upload';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';
import { DatePicker } from './DatePicker';
import { HourPicker } from './hour-picker';
import { salones } from '@/app/data/salones';
import { SelectSalon } from '../component/select-salon'
import { Switcher } from '../component/switcher'
import clsx from 'clsx';
import { GalleryUpload } from './gallery-upload';
import { Regalos } from './regalos';
import FotoFinal from './FotoFinal'


const EventForm = () => {
    const [aSelectIsOpen, setASelectIsOpen] = useState(false)
    const [selectedSalon, setSelectedSalon] = useState("");
    const [conGaleria, setConGaleria] = useState(true);
    const [conRegalos, setConRegalos] = useState(true);

    const [fotoRegalos, setFotoRegalos] = useState();
    const [galeria, setGaleria] = useState([]);
    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [fotofinal, setFotofinal] = useState();
    const [cbu, setCbu] = useState('');
    const [titular, setTitular] = useState('')
    const [alias, setAlias] = useState('')
    const [frase, setFrase] = useState('')
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('')
    const [coverImage, setCoverImage] = useState(null);
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

            if (!nombre || !fecha || !selectedSalon) {
                alert('Please fill in all required fields.');
                return;
            }


            const selectedSalonObject = salones.find(salon => salon.nombre === selectedSalon);

            const newEvent = {
                nombre,
                email,
                fecha,
                hora: selectedHour + ':' + selectedMinute,
                nombre_salon: selectedSalonObject.nombre,
                direccion_salon: selectedSalonObject.direccion,
                foto_salon: selectedSalonObject.foto_salon,
                ubicacion_salon: selectedSalonObject.link_maps,
                galeria: [],
                alias,
                cbu,
                titular,
                frase,
            };


            const docRef = await addDoc(eventRef, newEvent);


            if (!selectedSalonObject) {
                alert('Selected salon not found in the salones array.');
                return;
            }


            if (coverImage) {
                const storageRef = ref(storage, `images/${docRef.id}/${coverImage.name}`);
                await uploadBytes(storageRef, coverImage);
                newEvent.fotoPortada = await getDownloadURL(storageRef);
                console.log(newEvent.fotoPortada)
            }

            if (fotoRegalos) {
                const storageRef = ref(storage, `images/${docRef.id}/${fotoRegalos.name}`);
                await uploadBytes(storageRef, fotoRegalos);
                newEvent.fotoRegalos = await getDownloadURL(storageRef);
                console.log(newEvent.fotoRegalos)
            }
            if (fotofinal) {
                const storageRef = ref(storage, `images/${docRef.id}/${fotofinal.name}`);
                await uploadBytes(storageRef, fotofinal);
                newEvent.fotoFinal = await getDownloadURL(storageRef);
                console.log(newEvent.fotoFinal)
            }


            console.log(galeria)


            const storagePromises = galeria.map(async (image, index) => {
                const storageRef = ref(storage, `images/${docRef.id}/galleryImage${index + 1}`);
                await uploadBytes(storageRef, image);
                return getDownloadURL(storageRef);
            });


            newEvent.galeria = await Promise.all(storagePromises);

            // await updateDoc(docRef, { galeria: imageUrls });

            await setDoc(docRef, newEvent, { merge: true });

            setNombre('');
            setCoverImage(null);

            alert('Invitación creada exitosamente!');

        } catch (error) {
            console.error('Error creating product: ', error);
        }
    };


    return (
        <div className="bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
            {aSelectIsOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,
                        pointerEvents: 'none'
                    }}
                ></div>
            )}
            <h2 className="text-2xl text-center font-semibold p-6 pt-12">Invitacion Interactiva</h2>

            <p className='mx-4 pb-8 text-center border-b border-gray-300 mb-4 '>Te invitamos a completar toda la información necesaria para generar tu invitación interactiva. <br /> Les recomendamos mirar <Link className='underline' href={'https://invitacionesjanos.com.ar/6/muestraboda'} target='_blank'> <strong> Este ejemplo </strong> </Link> para entender cómo es el servicio y cómo queda organizada la información dentro de la tarjeta.</p>
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

                        <Label htmlFor="fyh">Fecha y Hora: </Label> <span className='text-sm text-gray-500'>Elegí la fecha y hora del evento </span>
                        <DatePicker setFecha={setFecha} />
                        <HourPicker setSelectedHour={setSelectedHour} setSelectedMinute={setSelectedMinute} selectedHour={selectedHour} selectedMinute={selectedMinute} />
                    </div>
                    <div className='space-y-2 pt-6'>
                        <Label htmlFor="fyh">Salón: </Label> <span className='text-sm text-gray-500'>Seleccioná el salón </span>
                        <SelectSalon salones={salones} setASelectIsOpen={setASelectIsOpen} setSelectedSalon={setSelectedSalon} selectedSalon={selectedSalon} selectedMinute={selectedMinute} />
                    </div>
                </div>

                <div className={clsx(aSelectIsOpen ? "pointer-events-none mt-5" : "pointer-events-auto mt-5")}>
                    <CoverUpload setCoverImage={setCoverImage} coverImage={coverImage} />
                </div>


                <Switcher option={conGaleria} setter={setConGaleria} title={'Galería de fotos'} subtitle={'Elegí 6 fotos para tu galería'} />
                {
                    conGaleria &&
                    <GalleryUpload setGaleria={setGaleria} />
                }

                <Switcher option={conRegalos} setter={setConRegalos} title={'Sección Regalos'} subtitle={'Subí la foto para ésta sección e ingresá los datos bancarios para recibir los regalos'} />

                {
                    conRegalos &&
                    <Regalos setFotoRegalos={setFotoRegalos} fotoRegalos={fotoRegalos} setCbu={setCbu} setAlias={setAlias} cbu={cbu} setTitular={setTitular} titular={titular} alias={alias} frase={frase} setFrase={setFrase} />
                }
                <FotoFinal setFotofinal={setFotofinal} />
                <div className='w-full flex items-center justify-center'>

                    <button onClick={handleCreateProduct} className="bg-black mt-6 mb-12 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Crear Invitación</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;