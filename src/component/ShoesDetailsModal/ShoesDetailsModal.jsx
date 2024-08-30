import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { VscActivateBreakpoints } from "react-icons/vsc";

const ShoesDetailsModal = ({id}) => {
    const axiosCommon = useAxiosCommon()
    const { data: shoesDetails = [] } = useQuery({
        queryKey: ["shoesDetails", id],
        queryFn: async () => {
            const res = await axiosCommon.get(`/shoes-details/${id}`)
            return res.data
        }
    })

    console.log(shoesDetails)
    const shoe = shoesDetails[0] || {}

    const {image, price, brand, description, category, name, size = [], color = []} = shoe


    return (
        <div>
            <div className=" overflow-hidden bg-white md:rounded-lg nunito">
            <img className="object-cover w-full h-64" src={image} alt="Article" />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{brand}</span>
                        <div className="flex justify-between items-center">
                            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:underline" tabIndex="0" role="link">{name}</a>
                            <p className="text-2xl font-bold text-red-500">${price}</p>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
                        <div className="my-4 space-y-1">
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Size</span> {size.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Color</span> {color.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints />{category} Shoes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoesDetailsModal;