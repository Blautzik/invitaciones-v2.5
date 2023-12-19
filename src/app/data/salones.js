import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";




const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)


const auth = getAuth(app);

export default async function signIn(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const salones = [
    { nombre: "Jano’s Avellaneda", direccion: "Gral. Güemes 897, 1824 Avellaneda, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Avellaneda", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987790/salones/avellaneda.png' },
    { nombre: "Jano’s Avellaneda 2", direccion: "Gral. Güemes 897, 1824 Avellaneda, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Avellaneda", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987821/salones/avellaneda%202.png' },
    { nombre: "Jano’s La Plata", direccion: "Los Hornos 60 y 132, 1900 La Plata, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+La+Plata", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987838/salones/la%20plata.png' },
    { nombre: "Jano’s Nuñez", direccion: "Av. Libertador 7501, CABA, 1638 Nuñez, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Nuñez", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987858/salones/nu%C3%B1ez.png' },
    { nombre: "Jano’s Darwin", direccion: "Cnel. Niceto Vega 5350, C1414 Ciudad Autónoma de Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Darwin", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987873/salones/darwin.png' },
    { nombre: "Jano’s Darwin 2", direccion: "Cnel. Niceto Vega 5350, C1414 Ciudad Autónoma de Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Darwin", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987888/salones/darwin%202.png' },
    { nombre: "Jano’s San Justo", direccion: "Monseñor Bufano 1546, Villa Luzuriaga", link_maps: "http://maps.google.com/?q=Jano's+San+Justo", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987902/salones/San%20Justo.png' },
    { nombre: "Jano’s Morón", direccion: "Presidente Perón 4852, Morón, Buenos Aires, 1708 Morón, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Morón", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987917/salones/moron.png' },
    { nombre: "Jano’s Merlo", direccion: "Pringles 780, Merlo, 1722 Merlo, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Merlo", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987936/salones/merlo.png' },
    { nombre: "Jano’s San Telmo Boutique", direccion: "Mexico 334, CABA, 1097 Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+San+Telmo+Boutique", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987948/salones/san%20telmo%20boutique.png' },
    { nombre: "Jano’s Ramos Boutique", direccion: "Alvear 508, 1704 Ramos Mejia, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Ramos+Boutique", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987965/salones/ramos%20boutique.png' },
    { nombre: "Jano’s Palermo Soho", direccion: "Armenia 1353- Palermo Soho", link_maps: "http://maps.google.com/?q=Jano's+Palermo+Soho", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987978/salones/palermo%20soho.jpg' },
    { nombre: "Jano’s Benavidez", direccion: "Av. Gral. Juan Domingo Peron 6940, 1621 Benavidez, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Benavidez", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702987994/salones/benavidez.jpg' },
    { nombre: "Jano’s Benavidez 2", direccion: "Chilavert 601, Benavidez, Tigre, 1621 Benavidez, Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+Benavidez+2", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988009/salones/benavidez%202.jpg' },
    { nombre: "Jano’s Hipódromo de La Plata", direccion: "Calle 44 y 115, La Plata", link_maps: "http://maps.google.com/?q=Jano's+Hipódromo+de+La+Plata", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988027/salones/hipodromo%20la%20plata.png' },
    { nombre: "Jano’s Playa Grande", direccion: "Av. Patricio Peralta Ramos 5050", link_maps: "http://maps.google.com/?q=Jano's+Playa+Grande", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988047/salones/playa%20grande.png' },
    { nombre: "Jano’s Hudson", direccion: "Ombues km 35,5 - Hudson", link_maps: "http://maps.google.com/?q=Jano's+Hudson", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988062/salones/hudson.png' },
    { nombre: "Jano’s San Isidro", direccion: "Av. Bernabé Márquez 504, San Isidro, Provincia de Buenos Aires", link_maps: "http://maps.google.com/?q=Jano's+San+Isidro", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988075/salones/san%20isidro.png' },
    { nombre: "Jano’s San Miguel", direccion: "Gaspar Campos 2800", link_maps: "http://maps.google.com/?q=Jano's+San+Miguel", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988088/salones/san%20miguel.jpg' },
    { nombre: "Jano’s Acceso Oeste", direccion: "Acceso Oeste 31,5km – Paso del Rey", link_maps: "http://maps.google.com/?q=Jano's+Acceso+Oeste", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988103/salones/acceso%20oeste.png' },
    { nombre: "Jano’s Maschwitz", direccion: "Colectora Este 2555, Ramal Escobar Km 44,5, 1625 Ingeniero Maschwitz", link_maps: "http://maps.google.com/?q=Jano's+Maschwitz", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988138/salones/Maschwits.png' },
    { nombre: "Jano’s Bella Vista", direccion: "Corrientes 1682 – Bella Vista", link_maps: "http://maps.google.com/?q=Jano's+Bella+Vista", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988155/salones/bellavista.png' },
    { nombre: "Jano’s Bella Vista 2", direccion: "Gaspar Campos 1582 - Bella Vista", link_maps: "http://maps.google.com/?q=Jano's+Bella+Vista+2", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988170/salones/bellavista2.png' },
    { nombre: "Jano’s Pilar", direccion: "Panamericana Km 52, Pilar", link_maps: "http://maps.google.com/?q=Jano's+Pilar", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988187/salones/pilar.png' },
    { nombre: "Jano’s Puerto Madero", direccion: "Olga Cossettini 1031", link_maps: "http://maps.google.com/?q=Jano's+Puerto+Madero", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988208/salones/puerto%20madero.png' },
    { nombre: "Jano’s Olivos", direccion: "Mariano Pelliza 310 – Olivos", link_maps: "http://maps.google.com/?q=Jano's+Olivos", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988221/salones/olivos.png' },
    { nombre: "Jano’s Olivos 2", direccion: "Mariano Pelliza 310 – Olivos", link_maps: "http://maps.google.com/?q=Jano's+Olivos+2", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988235/salones/olivos%202.png' },
    { nombre: "Jano’s Hurlingham", direccion: "Gral Pedro Díaz 1800 – Hurlingham", link_maps: "http://maps.google.com/?q=Jano's+Hurlingham", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988255/salones/hurlingham.png' },
    { nombre: "Jano’s San Telmo", direccion: "Perú 338 – San Telmo", link_maps: "http://maps.google.com/?q=Jano's+San+Telmo", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988274/salones/san%20telmo.png' },
    { nombre: "Jano’s Martinez", direccion: "Monseñor Larumbe 821 – Martinez", link_maps: "http://maps.google.com/?q=Jano's+Martinez", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988288/salones/martinez.png' },
    { nombre: "Jano’s Vicente Lopez", direccion: "Pres. Hipólito Yrigoyen 803, B1638 Vicente López", link_maps: "http://maps.google.com/?q=Jano's+Vicente+Lopez", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988302/salones/vicente%20lopez.png' },
    { nombre: "Jano’s Champagnat", direccion: "San Martin 139 – Pilar Centro", link_maps: "http://maps.google.com/?q=Jano's+Champagnat", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988316/salones/champagnat.png' },
    { nombre: "Jano’s Quinta", direccion: "Ruta 8 km 42,200 – Pilar", link_maps: "http://maps.google.com/?q=Jano's+Quinta", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988334/salones/quinta.png' },
    { nombre: "Jano’s Ramos Mejia", direccion: "Av. de Mayo 1848 - Ramos Mejía", link_maps: "http://maps.google.com/?q=Jano's+Ramos+Mejia", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988349/salones/ramos%20mejia.png' },
    { nombre: "Jano’s Ramos Mejía II", direccion: "Av. de Mayo 1848 - Ramos Mejía", link_maps: "http://maps.google.com/?q=Jano's+Ramos+Mejia+II", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988362/salones/ramos%20mejia%202.png' },
    { nombre: "Jano’s Moreno", direccion: "Francisco Piovano 3787 – Moreno", link_maps: "http://maps.google.com/?q=Jano's+Moreno", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988378/salones/moreno.png' },
    { nombre: "Jano’s House", direccion: "Domingo Faustino Sarmiento 4539, José C. Paz", link_maps: "http://maps.google.com/?q=Jano's+House", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988394/salones/house.png' },
    { nombre: "Jano’s Ituzaingo", direccion: "José María Paz 1628 – Ituzaingó", link_maps: "http://maps.google.com/?q=Jano's+Ituzaingo", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988409/salones/ituzaing%C3%B3.png' },
    { nombre: "Jano’s Ituzaingo II", direccion: "Cnel. Ventura Alegre & Domingo Olivera, Ituzaingó", link_maps: "http://maps.google.com/?q=Jano's+Ituzaingo+II", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988425/salones/ituzaingo%202.png' },
    { nombre: "Jano’s Del Viso", direccion: "Av. Ingeniero Eduardo Madero 630 – Del Viso", link_maps: "http://maps.google.com/?q=Jano's+Del+Viso", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988442/salones/janos%20del%20viso.png' },
    { nombre: "Jano’s Liniers", direccion: "Larrazábal 557 - Liniers", link_maps: "http://maps.google.com/?q=Jano's+Liniers", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988459/salones/janos%20liniers.png' },
    { nombre: "Jano’s Escobar", direccion: "Av. Sarmiento 1131 (21,80km),Belén De Escobar", link_maps: "http://maps.google.com/?q=Jano's+Escobar", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988474/salones/escobar.png' },
    { nombre: "Jano’s San Martin 1", direccion: "Gral. Lavalle 8101, San Martin", link_maps: "http://maps.google.com/?q=Jano's+San+Martin+1", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988493/salones/san%20martin.png' },
    { nombre: "Jano’s San Martin 2", direccion: "Gral. Lavalle 8101, San Martin", link_maps: "http://maps.google.com/?q=Jano's+San+Martin+2", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988514/salones/san%20martin%202.png' },
    { nombre: "Jano’s San Martín 3", direccion: "Gral. Lavalle 8101, San Martin", link_maps: "http://maps.google.com/?q=Jano's+San+Martín+3", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988528/salones/san%20martin%203.png' },
    { nombre: "Jano’s Caba", direccion: "Bartolomé Mitre 12651, CABA", link_maps: "http://maps.google.com/?q=Jano's+Caba", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988557/salones/caba.png' },
    { nombre: "Jano’s City", direccion: "Hipolito Yrigoyen 399, Jose C Paz", link_maps: "http://maps.google.com/?q=Jano's+City", foto_salon: 'https://res.cloudinary.com/fedexx/image/upload/v1702988575/salones/city.png' }
];


const uploadSalonesToFirebase = async (salones) => {
  try {
    const salonRef = collection(db, 'salones');

    for (const salon of salones) {
      await addDoc(salonRef, salon);
    }

    console.log('Salones uploaded to Firebase Firestore successfully.');
  } catch (error) {
    console.error('Error uploading salones to Firebase:', error);
  }
};

