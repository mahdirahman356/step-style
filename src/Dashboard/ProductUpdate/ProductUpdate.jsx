import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Select from 'react-select'
import { imageUplode } from "../../imageAPI";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ProductUpdate = () => {
    const product = useLoaderData()
    console.log(product[0])

    const {_id, name, price, image, description, brand, category, color, size } = product[0]

    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [productImage, setProductImage] = useState(null)

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const defaultColor = colorOptions.filter(option => color.includes(option.value));
        const defaultSize = sizeOption.filter(option => size.includes(option.value));
        setSelectedColor(defaultColor.map(option => option.value));
        setSelectedSize(defaultSize.map(option => option.value))
    }, [color]);


    const handleAddProduct = async (e) => {
        e.preventDefault()
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

        const res = await axiosSecure.put(`/shoes-update/${_id}`, product)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: 'Success',
                text: 'Your product has been successfully  updated',
                icon: 'success',
                confirmButtonText: 'OK'
            })
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
            borderRadius: '1.5rem',
            padding: '4px',
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#888',
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
            <div className="w-[95%] mx-auto">
                <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Product Update</h2>
                <form onSubmit={handleAddProduct}>
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <input type="text" defaultValue={name} placeholder="Product Name" name="name" className="input input-bordered rounded-3xl rou w-full" />
                        <input type="text" defaultValue={price} placeholder="Product Price" name="price" className="input input-bordered rounded-3xl rou w-full" />
                        <input type="text" defaultValue={description} placeholder="Description" name="description" className="input input-bordered rounded-3xl rou w-full" />
                        <input type="text" defaultValue={brand} placeholder="Brand" name="brand" className="input input-bordered rounded-3xl rou w-full" />

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


                    <p className="mt-3 text-gray-500 mb-1 text-sm ml-2">Product Image</p>
                    <label htmlFor="image" className=" flex md:w-1/2 mb-5 items-center justify-center px-3 py-3  text-center bg-white border-2 border-dashed rounded-lg cursor-pointer ">
                        <div className=''>
                            <input
                                type="file"
                                name="image"
                                className="file-input h-36 bg-[#1A2130] border-none text-white w-full max-w-xs"
                                accept="image/*"
                            />
                        </div>
                    </label>

                    <button className="btn w-64 mb-5 rounded-3xl bg-[#1A2130] text-white">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdate;