import { useState } from 'react';
import Select from 'react-select'
import { imageUplode } from '../../imageAPI';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import uplosdImage from "../../assets/image/upload-icon-30.png"
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [productImage, setProductImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const handleAddProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        const from = e.target
        const name = from.name.value
        const price = from.price.value
        const description = from.description.value
        const brand = from.brand.value
        const category = from.category.value
        let image = from.image.files[0];
        let url = productImage


        try {
            if (image && !productImage) {
                const uploadResult = await imageUplode(image);
                url = uploadResult;
                console.log(uploadResult)
                setProductImage(url);
            }


        } catch (err) {
            console.log(err);
        }
        console.log(name, price, description, brand, category, selectedColor, selectedSize, productImage)

        const product = {
            name: name,
            price: price,
            description: description,
            brand: brand,
            image: url,
            date: new Date().toISOString(),
            size: selectedSize,
            color: selectedColor,
            category: category

        }
        console.log(product)

        try {

            const res = await axiosSecure.post("/shoes", product)
            console.log(res.data)
            if (res.data.acknowledged) {
                Swal.fire({
                    title: 'Success',
                    text: 'Your product has been successfully added',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                navigate("/dashboard/all-product")
            }

        } catch (error) {
            console.error('Error adding product:', error);
        }
        finally {
            setLoading(false);
        }

    }


    const handleChange = (selected) => {
        const value = selected ? selected.map(option => option.value) : []
        setSelectedColor(value)
    }

    const handleSize = (selected) => {
        const value = selected ? selected.map(option => option.value) : []
        setSelectedSize(value)
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(URL.createObjectURL(file))
        }
    }


    const color = [
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'gray', label: 'Gray' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'orange', label: 'Orange' },
        { value: 'purple', label: 'Purple' },
        { value: 'pink', label: 'Pink' },
        { value: 'beige', label: 'Beige' },
        { value: 'tan', label: 'Tan' },
        { value: 'navy', label: 'Navy' },
        { value: 'burgundy', label: 'Burgundy' }
    ];
    const category = [
        { value: 'Casual', label: 'Casual' },
        { value: 'Running', label: 'Running' },
    ]

    const size = [
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
    ]


    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '0',
            padding: '4px',
            borderColor: 'transparent',
            borderBottom: '2px solid #ccc',
            boxShadow: 'none',
            '&:hover': {
                borderBottom: '2px solid #888',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            borderRadius: '1rem',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            fontWeight: 'bold',
        }),
    };

    return (
        <div className="w-[80%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="flex flex-col-reverse md:flex-row justify-between mb-6 mt-20 gap-24">

                    <div>
                        <div className='flex justify-start mb-6'>
                            <div>
                                <label htmlFor="file" className="block text-sm text-gray-500">Product Image</label>

                                <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl">


                                    <img className='w-64 h-52 object-cover rounded-md' src={selectedImage ? selectedImage : uplosdImage} alt="" />

                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange} />
                                </label>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <Select name='category' styles={customStyles} placeholder="Select category" options={category} />

                            <Select name='colour' onChange={handleChange} styles={customStyles} placeholder="Select colour" isMulti={true} options={color} />

                            <Select name='size' onChange={handleSize} styles={customStyles} placeholder="Select Size" isMulti={true} options={size} />
                        </div>
                    </div>


                    <div className='md:w-1/2 flex flex-col gap-y-14 md:gap-0 justify-between mt-6'>
                        <div>
                            <input type="text"
                                placeholder="Product Name"
                                name="name"
                                className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                            />

                        </div>

                        <div>
                            <input type="text"
                                placeholder="Product Price"
                                name="price"
                                className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                            />

                        </div>

                        <div>
                            <input type="text"
                                placeholder="Description"
                                name="description"
                                className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                            />

                        </div>

                        <div>
                            <input type="text"
                                placeholder="Brand"
                                name="brand"
                                className='grow pl-4 w-full border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                            />
                        </div>
                    </div>


                </div>
                <button className="btn my-12 w-64 mb-5 rounded-md bg-[#677D6A] text-white">
                    {loading ? <span className="loading loading-spinner loading-md"></span>
                        : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;