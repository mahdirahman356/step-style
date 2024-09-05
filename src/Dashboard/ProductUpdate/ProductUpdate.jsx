import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Select from 'react-select'
import { imageUplode } from "../../imageAPI";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import uplosdImage from "../../assets/image/upload-icon-30.png"


const ProductUpdate = () => {
    const product = useLoaderData()
    console.log(product[0])

    const { _id, name, price, image, description, brand, category, color, size } = product[0]
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [productImage, setProductImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    useEffect(() => {
        const defaultColor = colorOptions.filter(option => color.includes(option.value));
        const defaultSize = sizeOption.filter(option => size.includes(option.value));
        setSelectedColor(defaultColor.map(option => option.value));
        setSelectedSize(defaultSize.map(option => option.value))
    }, [color]);


    const handleAddProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        const from = e.target
        const name = from.name.value
        const price = from.price.value
        const description = from.description.value
        const brand = from.brand.value
        const category = from.category.value
        let img = from.image.files[0];


        let url = image
        try {
            if (img && !productImage) {
                const uploadResult = await imageUplode(img);
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

        const res = await axiosSecure.put(`/shoes-update/${_id}`, product)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: 'Success',
                text: 'Your product has been successfully  updated',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            navigate("/dashboard/all-product")
        }

        
       } catch (err) {
        console.log(err);
    }
    finally {
        setLoading(false);
    }
    }

    console.log(selectedColor, setSelectedSize)

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

    const colorOptions = [
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
    const categoryOptions = [
        { value: 'Casual', label: 'Casual' },
        { value: 'Running', label: 'Running' },
    ]

    const sizeOption = [
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
    ]


    const defaultCategory = categoryOptions.find(option => option.value === category);



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
        <div>
            <div className="w-[80%] mx-auto">
                <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Product Update</h2>
                <form onSubmit={handleAddProduct}>
                    <div className="flex flex-col-reverse md:flex-row justify-between mb-6 mt-20 gap-24">

                        <div>
                            <div className='flex justify-start mb-6'>
                                <div>
                                    <label htmlFor="file" className="block text-sm text-gray-500">Product Image</label>

                                    <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl">


                                        <img className='w-64 h-52 object-cover rounded-md' src={selectedImage ? selectedImage : image} alt="" />

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
                            <div className="space-y-6">
                                <Select
                                    name='category'
                                    defaultValue={defaultCategory}
                                    styles={customStyles}
                                    placeholder="Select category"
                                    options={categoryOptions} />

                                <Select
                                    name='colour'
                                    value={selectedColor.map(colorValue => colorOptions.find(option => option.value === colorValue))}
                                    onChange={handleChange}
                                    styles={customStyles}
                                    placeholder="Select colour"
                                    isMulti={true}
                                    options={colorOptions} />

                                <Select
                                    name='size'
                                    value={selectedSize.map(sizeValue => sizeOption.find(option => option.value === sizeValue))}
                                    onChange={handleSize}
                                    styles={customStyles}
                                    placeholder="Select Size"
                                    isMulti={true}
                                    options={sizeOption} />
                            </div>
                        </div>

                        <div className='md:w-1/2 flex flex-col gap-y-14 md:gap-0 justify-between mt-6'>
                       <div>
                       <input
                            type="text"
                            defaultValue={name}
                            placeholder="Product Name"
                            name="name"
                            className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                        />

                       </div>
                        <div>
                        <input
                            type="text"
                            defaultValue={price}
                            placeholder="Product Price"
                            name="price"
                            className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                        />
                        </div>

                       <div>
                       <input
                            type="text"
                            defaultValue={description}
                            placeholder="Description"
                            name="description"
                            className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                        />
                       </div>

                       <div>
                       <input
                            type="text"
                            defaultValue={brand}
                            placeholder="Brand"
                            name="brand"
                            className='grow w-full pl-4 border-b-2 border-gray-300 pb-1 focus:border-blue-500 outline-none rounded-none'
                        />
                       </div>

                        </div>

                        




                    </div>


                    <button className="btn my-12 w-64 mb-5 rounded-md bg-[#1A2130] text-white">
                    {loading ? <span className="loading loading-spinner loading-md"></span>
                        : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdate;