import { useState } from 'react';
import Select from 'react-select'
import { imageUplode } from '../../imageAPI';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AddProduct = () => {

    const [selectedColor, setSelectedColor] = useState([])
    const [selectedSize, setSelectedSize] = useState([])
    const [productImage, setProductImage] = useState(null)

    const axiosSecure = useAxiosSecure()

    const handleAddProduct = async(e) => {
        e.preventDefault()
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
        console.log(name, price, description, brand, category,  selectedColor, selectedSize, productImage)

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

     const res = await   axiosSecure.post("/shoes", product) 
     console.log(res.data)  
     if(res.data.acknowledged) {
        Swal.fire({
            title: 'Success',
            text: 'Your product has been successfully added',
            icon: 'success',
            confirmButtonText: 'OK'
        })
     }
    
    }


    const handleChange = (selected) => {
        const value = selected ? selected.map(option => option.value) : []
        setSelectedColor(value)
    }

    const handleChecboxChange = (e) => {
        const value = e.target.value
        setSelectedSize(prevSizes => prevSizes.includes(value) ? prevSizes.filter(size => size !== value) : [...prevSizes, value])
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
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <input type="text" placeholder="Product Name" name="name" className="input input-bordered rounded-3xl rou w-full" />
                    <input type="text" placeholder="Product Price" name="price" className="input input-bordered rounded-3xl rou w-full" />
                    <input type="text" placeholder="Description" name="description" className="input input-bordered rounded-3xl rou w-full" />
                    <input type="text" placeholder="Brand" name="brand" className="input input-bordered rounded-3xl rou w-full" />

                    <Select name='category' styles={customStyles} placeholder="Select category" options={category} />

                    <Select name='colour' onChange={handleChange} styles={customStyles} placeholder="Select colour" isMulti={true} options={color} />

                    <div className='mb-4 mx-3'>
                        <span className="block text-gray-500 mb-1">Size</span>
                        <div className="flex flex-wrap justify-between">
                            {["6", "7", "8", "9", "10", "11"].map((size, index) =>
                                <div key={index} className="flex items-center">
                                    <input onChange={handleChecboxChange} type="checkbox" name='size' value={size} className="checkbox checkbox-sm mr-2" /><p className="text-gray-500">{size}</p>
                                </div>)}
                        </div>
                    </div>

                </div>

                  
                <p className="mt-3 text-gray-500 mb-1 text-sm ml-2">Profile Photo</p>
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
    );
};

export default AddProduct;