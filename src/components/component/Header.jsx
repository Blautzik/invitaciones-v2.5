import React from 'react'




const Header = () => {
    const smartphoneMockup = 'https://res.cloudinary.com/fedexx/image/upload/v1696787444/invi/pngwing.com_ddzl1w.png';


    const productImageURL = 'https://res.cloudinary.com/fedexx/image/upload/v1696788282/invi/Captura_de_pantalla_2023-10-08_150359_pnbmyt.png';
    return (
        <div className="w-72 mx-auto p-4 rounded-lg relative flex flex-col justify-center items-center">

            <div
                className="absolute inset-0 flex pt-3 justify-center"
            >
                <img
                    src={smartphoneMockup}
                    alt="Smartphone Mockup"
                    className="w-auto h-36 "
                />
            </div>
            <img
                src={productImageURL}
                alt='foto'
                className="max-h-[8.3rem] mx-auto mb-7"
            />
            
        </div>
    )
}

export default Header