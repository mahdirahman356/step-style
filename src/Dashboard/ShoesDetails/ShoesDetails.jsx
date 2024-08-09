import { useLoaderData } from "react-router-dom";
import "../../style.css"
import { VscActivateBreakpoints } from "react-icons/vsc";
const ShoesDetails = () => {
    const shoesDetails = useLoaderData()
    console.log(shoesDetails[0])
    const {image, name, price, description, category, size, color, brand} = shoesDetails[0]
    return (
        <div className="hero bg-base-100 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src={image}
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold mb-3 header-font text-gray-800">{name}</h1>
                    <h2 className="text-4xl font-bold text-red-500">{price}$</h2>
                    <p className="py-6">
                        {description}
                    </p>
                    <div className="my-4 space-y-1">
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Brand</span> {brand}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Size</span> {size.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Color</span> {color.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints />{category} Shoes</p>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default ShoesDetails;